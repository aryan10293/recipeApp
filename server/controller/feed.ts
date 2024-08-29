import User from "../model/user";
import Post from "../model/post"
import comment from "../model/comments"
import  { Request, Response} from "express";
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
                nameOfDish: req.body.title,
                steps: req.body.steps
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
    addLikeToPost: async(req: Request, res: Response) => {
        try {
            const postToAddALikeToo = await Post.findByIdAndUpdate(req.params.id,
                {$push:{likes: req.body.userId}},
                {new : true}
            )
                console.log(postToAddALikeToo)
            if(!postToAddALikeToo){
                return res.status(400).json({status:'400', message:"post was not liked, please try again"})
            } else {
                return res.status(200).json({status:'200', message:"post was liked successfully"})
            }
        } catch (error) {
           console.log(error) 
        }
    },
    unlikePost: async(req: Request, res: Response) => {
        try {
            const unlike = await Post.findByIdAndUpdate(req.params.id, 
                {$pull: {likes:req.body.userId}},
                {new:true}
            )
            if(!unlike){
                res.status(400).json({status:'400', message:'there was an issue unliking the post try again later'})
            } else {
                res.status(200).json({status:'200', message:"unliking post was successful"})
            }
        } catch (error) {
            console.log(error)
        }
    },
    commentRecipe: async(req: Request, res: Response) => {
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
    }, 
    addLikeToComment: async(req: Request, res: Response) => {
        try {
            const addLike = await comment.findByIdAndUpdate(req.params.id,
                {$push:{likes: req.body.userId}},
                {new : true}
            )
            if(!addLike){
                return res.status(400).json({status:'400', message:'failed to add like'})
            } else {
                return res.status(200).json({ status:'200', message:'like was successfully added'});
            }
        } catch (error) {
            console.log(error)
        }
    },
    unlikeComment: async(req: Request, res: Response) => {
        try {
            const removeLike = await comment.findByIdAndUpdate(req.params.id,
                {$pull:{likes: req.body.userId}},
                {new : true}
            )
            console.log(removeLike)
            if(!removeLike){
                return res.status(400).json({status:'400', message:'failed to remove like'})
            } else {
                return res.status(200).json({ status:'200', message:'removing like was successfully added'});
            }
        } catch (error) {
            console.log(error)
        }
    },
    bookmark: async(req: Request, res: Response) => {
        console.log('thanks for liking the post')
    },
    unbookmark: async(req: Request, res: Response) => {
        console.log('damn bruh why you unlike my comment')
    },

}
export default feed