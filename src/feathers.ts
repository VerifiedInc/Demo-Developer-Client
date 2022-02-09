import feathers from '@feathersjs/client';
import auth, { AuthenticationClient } from '@feathersjs/authentication-client';
import socketio from 'socket.io-client';
import feathersSocketio from '@feathersjs/socketio-client';
import { FeathersError } from '@feathersjs/errors';

const client = feathers();
const socket = socketio(
  process.env.REACT_APP_API_URL as string,
  { transports: ['websocket', 'polling'] }
);

class MyAuthenticationClient extends AuthenticationClient {
  async handleError (error: FeathersError, type: 'authenticate' | 'logout'): Promise<unknown> {
    console.log('error', error);
    return super.handleError(error, type);
  }
}
client.configure(feathersSocketio(socket, {
  timeout: 10000 // 10 seconds; default is 5 seconds
}));
client.configure(auth({
  Authentication: MyAuthenticationClient,
  storage: window.localStorage,
  path: 'userAuthentication'
}));

export { client };
