import express, { Router } from "express";
import http from "http";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongo";
import flash from "express-flash";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import configurePassport from "./config/passport.js";
import dotenv from "dotenv";
import * as bodyParser from 'body-parser';
import WebSocket, { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 2040 });
const app = express();
const server = http.createServer(app);
const MongoStore = connectMongo(session);

let router: Router = express.Router();
router.use(bodyParser.text());

import connectDB from "./config/database";
import mainRoutes from "./routes/main";

dotenv.config({ path: "./config/.env" });

connectDB();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
//Body Parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json({limit: '50mb'}));


app.use(logger("dev"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(cookieParser("keyboard cat"));

app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

app.use(flash());

app.use("/", mainRoutes);

type Room = any
const rooms: { [key: string]: { [userId: string]: Room } } = {}


const broadcastMessage = (roomId: string, message: string) => {
  const clients = rooms[roomId];
  if(clients){
    for(let client in clients){
      if(clients[client].readyState === WebSocket.OPEN){
        clients[client].send(message)
      }
    }
  }
}

function isUserInRoom  (roomId: string, userId: string): boolean {
  return rooms[roomId] && rooms[roomId][userId] !== undefined;
}


wss.on('connection', (ws) => {
  let roomId: string  = ''


  ws.on('message', (message:string) => {
    const messageString = message.toString();
    const parsedMessage = JSON.parse(messageString)
    if(parsedMessage.type === 'join' && parsedMessage.chatRoomId.length === 8){

      roomId = parsedMessage.chatRoomId

      if (!rooms[roomId]) {
        rooms[roomId] = {};
      }

      // if (isUserInRoom(roomId, parsedMessage.userId)) {
      //   console.log('preventing user from joining rooom again works')
      //   return;
      // }
      
      rooms[roomId][parsedMessage.userId] = ws;
      console.log(Object.keys(rooms[roomId]).length)

      broadcastMessage(roomId, `${parsedMessage.userId} joined the room.`);
    }

    if(parsedMessage.type === 'message'){
      roomId = parsedMessage.chatRoomId
      broadcastMessage(roomId, parsedMessage.message)
    }

  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});


app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it! on " + process.env.PORT);
});
