"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_flash_1 = __importDefault(require("express-flash"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_js_1 = __importDefault(require("./config/passport.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const bodyParser = __importStar(require("body-parser"));
const ws_1 = __importStar(require("ws"));
const wss = new ws_1.WebSocketServer({ port: 2040 });
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const MongoStore = (0, connect_mongo_1.default)(express_session_1.default);
let router = express_1.default.Router();
router.use(bodyParser.text());
const database_1 = __importDefault(require("./config/database"));
const main_1 = __importDefault(require("./routes/main"));
dotenv_1.default.config({ path: "./config/.env" });
(0, database_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, morgan_1.default)("dev"));
app.use((0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose_1.default.connection }),
}));
app.use((0, cookie_parser_1.default)("keyboard cat"));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_js_1.default)(passport_1.default);
app.use((0, express_flash_1.default)());
app.use("/", main_1.default);
const rooms = {};
const broadcastMessage = (roomId, message) => {
    const clients = rooms[roomId];
    if (clients) {
        for (let client in clients) {
            if (clients[client].readyState === ws_1.default.OPEN) {
                clients[client].send(message);
            }
        }
    }
};
function isUserInRoom(roomId, userId) {
    return rooms[roomId] && rooms[roomId][userId] !== undefined;
}
wss.on('connection', (ws) => {
    let roomId = '';
    ws.on('message', (message) => {
        const messageString = message.toString();
        const parsedMessage = JSON.parse(messageString);
        if (parsedMessage.type === 'join' && parsedMessage.chatRoomId.length === 8) {
            roomId = parsedMessage.chatRoomId;
            if (!rooms[roomId]) {
                rooms[roomId] = {};
            }
            rooms[roomId][parsedMessage.userId] = ws;
            console.log(Object.keys(rooms[roomId]).length);
            broadcastMessage(roomId, `${parsedMessage.userId} joined the room.`);
        }
        if (parsedMessage.type === 'message') {
            roomId = parsedMessage.chatRoomId;
            console.log(parsedMessage);
            broadcastMessage(roomId, parsedMessage.message);
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
