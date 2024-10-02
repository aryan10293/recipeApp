"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controller/auth"));
const feed_1 = __importDefault(require("../controller/feed"));
const profile_1 = __importDefault(require("../controller/profile"));
const message_1 = __importDefault(require("../controller/message"));
const router = express_1.default.Router();
router.post('/createaccount', auth_1.default.postCreateAccount);
router.post('/login', auth_1.default.postLogin);
router.post('/createrecipe', feed_1.default.createRecipe);
router.post('/createcomment', feed_1.default.commentRecipe);
router.post('/createmessage', message_1.default.createMessage);
router.post('/searchforusers', message_1.default.getUser);
router.post('/getuserchathistory', message_1.default.getMessageHistory);
router.get('/getuser/:id', auth_1.default.checkUser);
router.get('/getuserbyid/:id', auth_1.default.getUser);
router.get('/getallpost', feed_1.default.getAllPost);
router.get('/getpost/:id', feed_1.default.getPost);
router.get('/getcommentsfrompost/:id', feed_1.default.getComments);
router.get('/getuserbookmarks/:id', profile_1.default.getBookmarks);
router.get('/getuserlikedimages/:id', profile_1.default.getLikes);
router.get('/getchatroommessages/:chatRoomId', message_1.default.getMessagesFromChatRoom);
router.put('/addliketopost/:id', feed_1.default.addLikeToPost);
router.put('/addliketocomment/:id', feed_1.default.addLikeToComment);
router.put('/unlikepost/:id', feed_1.default.unlikePost);
router.put('/unlikecomment/:id', feed_1.default.unlikeComment);
router.put('/addbookmark/:id', feed_1.default.bookmark);
router.put('/unbookmark/:id', feed_1.default.unbookmark);
router.put('/updateprofile/:id', profile_1.default.updateProfile);
router.put('/follow/:id', profile_1.default.follow);
router.put('/unfollow/:id', profile_1.default.unfollow);
router.put('/:apicall/:messageId', message_1.default.likeMessage);
router.delete('/deletepost/:id', feed_1.default.deletePost);
exports.default = router;
