import { io } from 'socket.io-client';
import {getURLBE} from './index.js'

const URL = getURLBE();

const socket = io.connect(URL, { transports : ['websocket'] });
export default socket
