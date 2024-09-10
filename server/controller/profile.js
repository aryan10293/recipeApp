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
const cloudinary_1 = __importDefault(require("../middleware/cloudinary"));
let profile = {
    updateProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.body.profiePic === undefined) {
                const getUserAndUpdate = yield user_1.default.findOneAndUpdate({ _id: req.params.id }, {
                    $set: {
                        bio: req.body.bio,
                        userName: req.body.userName,
                        skillLevel: req.body.skillLevel,
                        cooking: req.body.cookingStyle,
                        
                    }
                });
                if (!getUserAndUpdate) {
                    res.status(400).json({ status: '400', message: 'profile was not updated' });
                }
                else {
                    res.status(200).json({ status: '200', message: 'profile was updated' });
                }
            }
            else {
                const getUserAndUpdate = yield user_1.default.findOneAndUpdate({ _id: req.params.id }, {
                    $set: {
                        img: yield (0, cloudinary_1.default)(req.body.profilePic),
                        bio: req.body.bio,
                        userName: req.body.userName,
                        skillLevel: req.body.skillLevel,
                        cooking: req.body.cookingStyle
                    }
                });
                if (!getUserAndUpdate) {
                    res.status(400).json({ status: '400', message: 'profile was not updated' });
                }
                else {
                    res.status(200).json({ status: '200', message: 'profile was updated' });
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getBookmarks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getUserBookmarks = yield user_1.default.findOne({ _id: req.params.id });
            if (!getUserBookmarks) {
                res.status(400).json({ status: '400', message: 'error getting your bookmarked post' });
            }
            else {
                res.status(200).json({ status: '200', message: 'sucess', bookmarks: getUserBookmarks });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getLikes: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getPost = yield post_1.default.find();
            if (!getPost) {
                res.status(400).json({ status: '400', message: 'failure to load post' });
            }
            else {
                const getUserLikes = getPost.filter((x) => x.likes.includes(req.params.id) ? x : null);
                res.status(200).json({ status: 200, message: 'success getting likes', likedpost: getUserLikes });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    follow: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getUser = yield user_1.default.findByIdAndUpdate(req.params.id, { $push: { followers: req.body.personToFollow } }, { new: true });
            const getTheUserGettingFollowed = yield user_1.default.findByIdAndUpdate(req.body.personToFollow, { $push: { followings: req.params.id } }, { new: true });
            if (!getUser || !getTheUserGettingFollowed) {
                res.status(400).json({ status: '400', message: 'failure to follow user' });
            }
            else {
                res.status(200).json({ status: 200, message: 'success following user' });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    unfollow: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getUser = yield user_1.default.findByIdAndUpdate(req.params.id, { $pull: { followers: req.body.personToFollow } }, { new: true });
            const getTheUserGettingUnfollowed = yield user_1.default.findByIdAndUpdate(req.body.personToFollow, { $pull: { followings: req.params.id } }, { new: true });
            if (!getUser || !getTheUserGettingUnfollowed) {
                res.status(400).json({ status: '400', message: 'failure to unfollow user' });
            }
            else {
                res.status(200).json({ status: 200, message: 'success following user' });
            }
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.default = profile;
