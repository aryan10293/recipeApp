"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const commentSchema = new mongoose_2.Schema({
    timeOfPost: { type: String, default: Date.now() },
    commentorId: { type: String, required: true },
    postId: { type: String, required: true },
    comment: { type: String, required: true },
    likes: { type: Array, default: [] },
});
const comment = mongoose_1.default.model('Comment', commentSchema);
exports.default = comment;
