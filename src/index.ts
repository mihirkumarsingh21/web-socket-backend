import express, { Application } from "express";
import { Server, Socket } from "socket.io";
import http from "http";



interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}


const app: Application = express();

const server = http.createServer(app);

const io = new Server < ServerToClientEvents, InterServerEvents, ClientToServerEvents > (server);

io.on("connection", (socket: Socket) => {
    console.log(`socket connected. ${socket.id}`);

    socket.on("message", (msg) => {
      console.log(`from client-> ${msg}`);

      socket.emit("recived-msg", msg);
      socket.broadcast.emit("newUser", "hello, everyone.!");
      socket.on("join_room", (rooName) => {
        socket.join(rooName);
        socket.broadcast.to(rooName).emit("room_joined", `hey ${socket.id} joined this room.`)
      })


  
    })
})





const port = 3000;

server.listen(port, () => {
    console.log(`server is running at port http://localhost:${port}`);
    
})