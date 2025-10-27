import express from "express";
import http from "http";
import {WebSocketServer, WebSocket} from "ws";

const app = express();
const server = http.createServer(app);

const wss = new WebSocketServer({server});

// WEB SOCKET.

wss.on("connection", (socket: WebSocket) => {
    console.log(`socket connected successgully`);    

    socket.on("message", (message) => {
        console.log(`message: ${message}`);
        socket.send("hello from server");
        
    })
})


// http request.


const port = 3000;

server.listen(port, () => {
    console.log(`server is running at port -> http://localhost:${port}`);
})
