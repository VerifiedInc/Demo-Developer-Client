import feathers from '@feathersjs/client';
import socketio from 'socket.io-client';
import feathersSocketio from '@feathersjs/socketio-client';

const client = feathers();
const socket = socketio(process.env.REACT_APP_API_URL as string);

client.configure(feathersSocketio(socket));
client.configure(feathers.authentication({
  storage: window.localStorage
}));

export { client };
