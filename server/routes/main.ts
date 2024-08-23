import express from "express";
import auth from "../controller/auth"
import feed from "../controller/feed"
const router = express.Router();
router.post('/createaccount', auth.postCreateAccount)
router.post('/login', auth.postLogin)
router.post('/createrecipe', feed.createRecipe)
router.post('/createcomment', feed.commentRecipe)

router.get('/getuser/:id', auth.checkUser)
router.get('/getallpost', feed.getAllPost)
router.get('/getpost/:id', feed.getPost)
router.get('/getcommentsfrompost/:id', feed.getComments)
export default router;