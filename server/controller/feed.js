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
const post_1 = __importDefault(require("../model/post"));
const comments_1 = __importDefault(require("../model/comments"));
const cloudinary_1 = __importDefault(require("../middleware/cloudinary"));
let feed = {
    createRecipe: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const recipeData = {
                userWhoPostId: req.body.userId,
                image: yield (0, cloudinary_1.default)(req.body.pictureOfFood),
                ingridentList: req.body.ingridentList,
                levelOfMeal: req.body.levelOfMeal,
                prepTime: req.body.prepTime,
                nameOfDish: req.body.title
            };
            const createRecipie = yield post_1.default.create(recipeData);
            if (!createRecipie) {
                return res.status(404).json({ status: '404', message: 'error is unknown, Please try again!' });
            }
            else {
                return res.status(200).json({ status: '200', message: 'recipe sucessfully uploaded' });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getAllPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield post_1.default.find();
            if (!post) {
                res.status(400).json({ error: 'failed to load post' });
            }
            else {
                res.status(200).json({ success: '200', post: post });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield post_1.default.find({ _id: req.params.id });
            if (!post) {
                res.status(400).json({ error: 'failed to load post' });
            }
            else {
                res.status(200).json({ success: '200', post: post });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    commentRecipe: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('hey does this comment stuff work');
        try {
            const createComment = {
                commentorId: req.body.userId,
                postId: req.body.postId,
                comment: req.body.comment
            };
            const postComment = yield comments_1.default.create(createComment);
            if (!postComment) {
                return res.status(400).json({ status: '400', message: 'failed to post comment' });
            }
            else {
                return res.status(200).json({ status: '200', message: 'comment was sucessfully posted' });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getComments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getPostComment = yield comments_1.default.find({ postId: req.params.id });
        if (!getPostComment) {
            return res.status(400).json({ status: '400', message: 'there was a error loading the comments' });
        }
        else {
            return res.status(200).json({ status: '200', message: 'loading comments was successful', comments: getPostComment });
        }
    })
};
exports.default = feed;
