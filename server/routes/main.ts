import express from "express";
import auth from "../controller/auth"
import feed from "../controller/feed"
import profile from "../controller/profile"
const router = express.Router();
router.post('/createaccount', auth.postCreateAccount)
router.post('/login', auth.postLogin)
router.post('/createrecipe', feed.createRecipe)
router.post('/createcomment', feed.commentRecipe)

router.get('/getuser/:id', auth.checkUser)
router.get('/getuserbyid/:id', auth.getUser)
router.get('/getallpost', feed.getAllPost)
router.get('/getpost/:id', feed.getPost)
router.get('/getcommentsfrompost/:id', feed.getComments)
router.get('/getuserbookmarks/:id', profile.getBookmarks)
router.get('/getuserlikedimages/:id', profile.getLikes)

router.put('/addliketopost/:id', feed.addLikeToPost)
router.put('/addliketocomment/:id', feed.addLikeToComment)
router.put('/unlikepost/:id', feed.unlikePost)
router.put('/unlikecomment/:id', feed.unlikeComment)
router.put('/addbookmark/:id', feed.bookmark)
router.put('/unbookmark/:id', feed.unbookmark)
router.put('/updateprofile/:id', profile.updateProfile)
router.put('/follow/:id', profile.follow)
router.put('/unfollow/:id', profile.unfollow)

router.delete('/deletepost/:id', feed.deletePost)
export default router;