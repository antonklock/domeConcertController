import { io } from 'socket.io-client';

//TODO: MOVE TO ENV FILE
const herokuURL = "https://dome-concert-controller-server-180a81f5a181.herokuapp.com";


const URL = process.env.NODE_ENV === 'production' ? herokuURL : 'http://localhost:4010';

//TODO: Remove withCredentials after testing??
export const socket = io(URL, { withCredentials: true });