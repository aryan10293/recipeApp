import express from "express";
import auth from "../controller/auth"
import feed from "../controller/feed"
const router = express.Router();
router.post('/createaccount', auth.postCreateAccount)
router.post('/login', auth.postLogin)
router.post('/createrecipe', feed.createRecipe)
router.post('/createcomment', feed.commentRecipe)
export default router;