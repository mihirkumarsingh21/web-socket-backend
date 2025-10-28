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
  console.log(`a user connected : ${socket.id}`);
  
  socket.on("join_room", (username) => {
    console.log(`${username} join room.`);
    
  })
})

app.get("/", (req, res) => {
  res.send("hello world.")
})





const port = 3000;

server.listen(port, () => {
    console.log(`server is running at port http://localhost:${port}`);
    
})