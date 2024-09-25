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
                nameOfDish: req.body.title,
                steps: req.body.steps,
                fats: req.body.fats,
                carbs: req.body.carbs,
                protein: req.body.protein,
                calories: req.body.calories,
                perServingMacros: req.body.perServingMacros,
                servings: req.body.servings
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
    addLikeToPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postToAddALikeToo = yield post_1.default.findByIdAndUpdate(req.params.id, { $push: { likes: req.body.userId } }, { new: true });
            console.log(postToAddALikeToo);
            if (!postToAddALikeToo) {
                return res.status(400).json({ status: '400', message: "post was not liked, please try again" });
            }
            else {
                return res.status(200).json({ status: '200', message: "post was liked successfully" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    unlikePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const unlike = yield post_1.default.findByIdAndUpdate(req.params.id, { $pull: { likes: req.body.userId } }, { new: true });
            if (!unlike) {
                res.status(400).json({ status: '400', message: 'there was an issue unliking the post try again later' });
            }
            else {
                res.status(200).json({ status: '200', message: "unliking post was successful" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    commentRecipe: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
    addLikeToComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const addLike = yield comments_1.default.findByIdAndUpdate(req.params.id, { $push: { likes: req.body.userId } }, { new: true });
            if (!addLike) {
                return res.status(400).json({ status: '400', message: 'failed to add like' });
            }
            else {
                return res.status(200).json({ status: '200', message: 'like was successfully added' });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    unlikeComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const removeLike = yield comments_1.default.findByIdAndUpdate(req.params.id, { $pull: { likes: req.body.userId } }, { new: true });
            console.log(removeLike);
            if (!removeLike) {
                return res.status(400).json({ status: '400', message: 'failed to remove like' });
            }
            else {
                return res.status(200).json({ status: '200', message: 'removing like was successfully added' });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    bookmark: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findByIdAndUpdate(req.params.id, { $push: { savedRecipes: req.body.id } }, { new: true });
            if (!user) {
                res.status(400).json({ status: '400', message: "error was made trying to add bookmark" });
            }
            else {
                res.status(200).json({ status: '200', message: "bookmark was successfully added" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    unbookmark: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findByIdAndUpdate(req.params.id, { $pull: { savedRecipes: req.body.id } }, { new: true });
            if (!user) {
                res.status(400).json({ status: '400', message: "error was made trying to remove bookmark" });
            }
            else {
                res.status(200).json({ status: '200', message: "bookmark was successfully removed" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    deletePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletedPost = yield post_1.default.findByIdAndDelete(req.params.id);
            const getUser = yield user_1.default.updateMany({}, { $pull: { savedRecipes: req.params.id } }, { upsert: false });
            if (!deletedPost || !getUser) {
                res.status(400).json({ status: '400', message: 'post was not deleted or error with bookmarks' });
            }
            else {
                res.status(200).json({ status: '200', message: 'post was deleted' });
            }
        }
        catch (error) {
            console.log('error deleting item', error);
        }
    })
};
exports.default = feed;
