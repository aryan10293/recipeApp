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
const cloudinary_1 = __importDefault(require("../middleware/cloudinary"));
let messages = {
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getUser = yield user_1.default.find({
                "$or": [
                    { usernameSearch: { $regex: req.body.search.toLowerCase() } }
                ]
            });
            res.status(200).json({ status: '200', data: getUser });
        }
        catch (error) {
            console.error('Error fetching user:', error);
            return res.status(500).json({ status: '500', message: 'Server error', error: error.message });
        }
    }),
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.find();
        res.json(user);
    }),
    getMessageHistory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let checkkForDupObj = {};
            const queryDataBase = (id) => __awaiter(void 0, void 0, void 0, function* () {
                return yield user_1.default.find({ _id: id });
            });
            const getUsersYouChatedWith = yield messages_1.default.find({
                "$or": [
                    { recieverId: req.body.id },
                    { senderId: req.body.id }
                ]
            });
            getUsersYouChatedWith.forEach((x) => {
                if (x.senderId !== req.body.id) {
                    if (!checkkForDupObj[x.senderId]) {
                        checkkForDupObj[x.senderId] = x.senderId;
                    }
                }
                else {
                    if (!checkkForDupObj[x.recieverId]) {
                        checkkForDupObj[x.recieverId] = x.recieverId;
                    }
                }
            });
            const getTheUserDocumentsYouChatedWith = yield Promise.all(Object.keys(checkkForDupObj).map((id, i) => __awaiter(void 0, void 0, void 0, function* () {
                return queryDataBase(id);
            })));
            res.status(200).json(getTheUserDocumentsYouChatedWith);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ status: '500', message: 'Server error', error: error.message });
        }
    }),
    createMessage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let img;
        if (req.body.imgString === '') {
            img = '';
        }
        else {
            try {
                img = yield (0, cloudinary_1.default)(req.body.imgString);
            }
            catch (error) {
                console.log(error);
            }
        }
        const createMessage = {
            message: req.body.message,
            senderId: req.body.senderId,
            recieverId: req.body.recieverId,
            chatId: req.body.chatRoomId,
            imgString: img
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
    }),
    likeMessage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpDateAndTurnFalse = ['laugh', 'emphasize', 'like', 'dislike', 'heart', 'question'].filter((x) => req.params.apicall !== x ? x : null);
        const updateData = {};
        fieldsToUpDateAndTurnFalse.map((x) => {
            updateData[x] = false;
        });
        updateData[req.params.apicall] = true;
        try {
            const getMessage = yield messages_1.default.findByIdAndUpdate(req.params.messageId, updateData);
            if (!getMessage) {
                res.status(400).json({ status: '400', message: 'failure to like message' });
            }
            else {
                res.status(200).json({ status: '200', message: 'success liking the message' });
            }
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.default = messages;
