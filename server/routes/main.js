"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controller/auth"));
const feed_1 = __importDefault(require("../controller/feed"));
const router = express_1.default.Router();
router.post('/createaccount', auth_1.default.postCreateAccount);
router.post('/login', auth_1.default.postLogin);
router.post('/createrecipe', feed_1.default.createRecipe);
router.post('/createcomment', feed_1.default.commentRecipe);
router.get('/getuser/:id', auth_1.default.checkUser);
exports.default = router;