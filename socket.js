import { io } from 'socket.io-client';

const herokuURL = "https://dome-concert-controller-server-180a81f5a181.herokuapp.com/";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? herokuURL : 'http://localhost:4010';

export const socket = io(URL);