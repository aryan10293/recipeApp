"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const postSchema = new mongoose_2.Schema({
    timeOfPost: { type: String, default: Date.now() },
    nameOfDish: { type: String, required: true },
    userWhoPostId: { type: String, required: true },
    image: { type: String, required: true },
    ingridentList: { type: Array, required: true },
    levelOfMeal: { type: String, required: true },
    prepTime: { type: Number, required: true },
    likes: { type: Array, default: [] },
    bookmarks: { type: Array, default: [] },
    steps: { type: String, required: true}
});
const Post = mongoose_1.default.model('Post', postSchema);
exports.default = Post;
