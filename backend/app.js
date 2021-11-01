import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Message from './Model/message'
const app = express();
app.use(cors())
const http = require("http");
const server = http.createServer(app);
const io = require('socket.io')(server)


const authRouter = require("./Routes/auth");
const userRouter = require("./Routes/user");
const statusRouter = require("./Routes/status");
const likeRouter = require("./Routes/like");
const commentRouter = require("./Routes/comment");
const friendRouter = require("./Routes/friend");
const followRouter = require('./Routes/follow')

dotenv.config();

//db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// Middleware
app.use(express.json());


app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", statusRouter);
app.use("/api", likeRouter);
app.use("/api", commentRouter);
app.use("/api", friendRouter);
app.use("/api", followRouter);


const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
const users = [];
io.on('connection', (socket) => {
  // console.log('user connected :' + socket.id);
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('sendding-chat', () => {
    socket.broadcast.emit('a-sendding-message')
    // console.log('sendding chat')
  })
  socket.on('stop-sendding-chat', () => {
    io.sockets.emit('a-stop-message');
    // console.log('Stop sendding');
  });
  socket.on("user_connected", function (username) {
    // save in array
    console.log(username);
    users[username] = socket.id;
    // socket ID will be used to send message to individual person;
    // notify all connected clients;
    io.emit("user_connected", username);
  });
  socket.on("send_message", function (data) {
    console.log(data);
    const valueMess = {
      user: data.sender,
      content: data.message,
      receiver:data.receiver,
    }

    // send event to receiver;
    var socketId = users[data.receiver];
    io.to(socketId).emit("new_message", data);
  });
});
