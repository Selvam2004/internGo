import { io } from "socket.io-client";
const socket = io("http://192.168.0.141:8080"  );

export default socket;