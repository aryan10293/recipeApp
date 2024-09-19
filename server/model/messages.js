"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const messageSchema = new mongoose_2.Schema({
    time: { type: String, default: Date.now() },
    message: { type: String, required: true },
    senderId: { type: String, required: true },
    recieverId: { type: String, required: true },
    chatId: { type: String, required: true },
    edited: { type: Boolean, default: false },
    liked: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    imgString: { type: String, required: false }
});
const Message = mongoose_1.default.model('Message', messageSchema);
exports.default = Message;
