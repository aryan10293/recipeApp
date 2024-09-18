"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../model/user"));
const messages_1 = __importDefault(require("../model/messages"));
let messages = {
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getUser = yield user_1.default.find();
        if (!getUser) {
            res.status(400).json({ status: '400', message: 'couldnt get users' });
        }
        else {
            res.status(200).json({ status: '200', message: 'sucess', users: getUser });
        }
    }),
    createMessage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const createMessage = {
            message: req.body.message,
            senderId: req.body.senderId,
            recieverId: req.body.recieverId,
            chatId: req.body.chatRoomId,
        };
        const addMessageToDatabase = yield messages_1.default.create(createMessage);
        if (!addMessageToDatabase) {
            res.status(400).json({ status: '400', message: 'failure to add message to database' });
        }
        else {
            res.status(200).json({ status: '200', message: 'success in addding message to database' });
        }
    }),
    getMessagesFromChatRoom: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getMessages = yield messages_1.default.find({ chatId: req.params.chatRoomId });
        if (!getMessages) {
            res.status(400).json({ status: '400', message: 'error loaidng message' });
        }
        else {
            res.status(200).json({ status: '200', message: 'sucess loading message', messages: getMessages, wfrwc: req.params.chatRoomId });
        }
    })
};
exports.default = messages;