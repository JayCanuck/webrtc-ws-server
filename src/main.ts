// Websocket server based on `ws` package which handle WebRTC signaling
import { AddressInfo, WebSocket, WebSocketServer } from 'ws';
import { UUID, randomUUID } from 'node:crypto';

interface ActiveSocket extends WebSocket {
  id?: UUID;
  isAlive?: boolean;
}

interface MessageBase {
  key: string;
  // additionally properties can be included and will be forwarded to connected clients
  [K: string]: unknown;
}

interface InitMessage extends MessageBase {
  type: 'init';
}

interface DescriptionMessage extends MessageBase {
  type: 'offer' | 'answer';
  value: RTCSessionDescriptionInit;
}

interface CandidateMessage extends MessageBase {
  type: 'candidate';
  value: RTCIceCandidate;
}

type MessageData = InitMessage | DescriptionMessage | CandidateMessage;

const wss = new WebSocketServer({ port: 80 });
const active = new Map<string, ActiveSocket[]>();
const keys = new Map<string, string[]>();

const removeUser = (id: UUID) => {
  const userKeys = keys.get(id) || [];
  userKeys.forEach(key => {
    const peers = active.get(key);
    if (peers) {
      const after = peers.filter(peer => peer.id! !== id);
      if (after.length === 0) {
        active.delete(key);
      } else {
        active.set(key, after);
      }
    }
  });
  keys.delete(id);
};

wss.on('connection', (ws: ActiveSocket) => {
  if (!ws.id) ws.id = randomUUID();
  ws.isAlive = true;
  console.log('Connected user', ws.id!);

  // check heartbeat every 30 seconds, killing unresponsive/dead connections
  const interval = setInterval(function ping() {
    wss.clients.forEach((ws: ActiveSocket) => {
      if (ws.isAlive === false) {
        console.warn('User unresponsive, removing', ws.id!);
        removeUser(ws.id!);
        clearInterval(interval);
        return ws.terminate();
      }

      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', data => {
    const { key, type, value, ...rest } = JSON.parse(data.toString()) as MessageData;
    console.log(`Received ${type} message payload from ${ws.id!} for group ${key}`);

    if (!key || !type || !['init', 'offer', 'candidate', 'answer'].includes(type) || (type !== 'init' && !value)) {
      ws.emit('error', new Error('Invalid message format'));
      return;
    }

    // add key to user's key list
    const userKeys = keys.get(ws.id!) || [];
    if (!userKeys.includes(key)) userKeys.push(key);
    keys.set(ws.id!, userKeys);

    const peers = active.get(key) || [];
    let hasUser = false;
    peers.forEach(peer => {
      if (peer.id === ws.id) {
        // if missing user in group, we can add it later
        hasUser = true;
      } else if (type !== 'init') {
        // for non-init messages, emit to other users connected in group
        console.log(`    -> sending to ${peer.id}`);
        peer.send(JSON.stringify({ key, type, value, ...rest }));
      }
    });

    if (type === 'answer') {
      // can remove, all done signalling this group
      active.delete(key);
      keys.forEach((userKeys, id) => {
        const after = userKeys.filter(k => k !== key);
        if (after.length === 0) {
          keys.delete(id);
        } else {
          keys.set(key, after);
        }
      });
    } else {
      // ensure user is in the active key group of peers
      if (!hasUser) {
        peers.push(ws);
        active.set(key, peers);
      }
    }
  });

  ws.on('error', err => console.error);

  ws.on('close', () => {
    clearInterval(interval);
    removeUser(ws.id!);
    console.log('Disconnected user', ws.id!);
  });
});

const addr = wss.address() as AddressInfo;
console.log('WebSocket signal server started');
console.log(`ws://${addr.address.replace('::', '127.0.0.1')}:${addr.port}`);
