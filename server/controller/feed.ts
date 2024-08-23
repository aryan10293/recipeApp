import User from "../model/user";
import Post from "../model/post"
import comment from "../model/comments"
import  { request, Request, response, Response} from "express";
import uploadImage from "../middleware/cloudinary";
let feed = {
    createRecipe: async(req: Request, res: Response) => {
        try {
            const recipeData = {
                userWhoPostId: req.body.userId,
                image: await uploadImage(req.body.pictureOfFood),
                ingridentList: req.body.ingridentList,
                levelOfMeal: req.body.levelOfMeal,
                prepTime: req.body.prepTime,
                nameOfDish: req.body.title
            }
            const createRecipie =  await Post.create(recipeData)
            if (!createRecipie) {
                return res.status(404).json({ status:'404', message:'error is unknown, Please try again!'});
            } else {
                return res.status(200).json({ status:'200', message:'recipe sucessfully uploaded'});
            }
            
        } catch (error) {
            console.log(error)
        }
    },
    getAllPost: async(req: Request, res: Response) => {
        try {
            const post = await Post.find()
            if(!post){
                res.status(400).json({error: 'failed to load post'})
            } else {
                res.status(200).json({success: '200', post:post})
            }
        } catch (error) {
            console.log(error)
        }
    },
    getPost: async(req: Request, res: Response) => {
        try {
            const post = await Post.find({_id: req.params.id})
            if(!post){
                res.status(400).json({error: 'failed to load post'})
            } else {
                res.status(200).json({success: '200', post:post})
            }
        } catch (error) {
            console.log(error)
        }
    },
    commentRecipe: async(req: Request, res: Response) => {
        console.log('hey does this comment stuff work')
        try {
            const createComment = {
                commentorId: req.body.userId,
                postId: req.body.postId,
                comment: req.body.comment
            }
            const postComment = await comment.create(createComment)
            if(!postComment){
                return res.status(400).json({status:'400', message:'failed to post comment'})
            } else {
                return res.status(200).json({ status:'200', message:'comment was sucessfully posted'});
            }
        } catch (error) {
            console.log(error)
        }
    },
    getComments: async (req: Request,res: Response) => {
        const getPostComment = await comment.find({postId: req.params.id})
        if(!getPostComment){
            return res.status(400).json({status:'400', message:'there was a error loading the comments'})
        } else {
            return res.status(200).json({status: '200', message:'loading comments was successful', comments: getPostComment})
        } 
    }
}
export default feed