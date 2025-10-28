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

const ROOM = "group";

const io = new Server < ServerToClientEvents, InterServerEvents, ClientToServerEvents > (server);

io.on("connection", (socket: Socket) => {
  console.log(`a user connected : ${socket.id}`);

  // JOIN ROOM
    socket.on("join_room", async (username) => {
    console.log(`${username} joing the group.`);
      await socket.join(ROOM);

     socket.to(ROOM).emit("notify", username);
  })

  // CHAT MESSAGE

  socket.on("chat-message", async (msg) => {
      socket.to(ROOM).emit("message-sent", msg);

    console.log(`message recived : ${msg}`);
    
  })

  socket.on("typing", (userName) => {
    socket.to(ROOM).emit("typing", userName);
    console.log(`${userName} is typing...`);
    
  })

})

app.get("/", (req, res) => {
  res.send("hello world.")
})





const port = 3000;

server.listen(port, () => {
    console.log(`server is running at port http://localhost:${port}`);
    
})