import User from "../model/user";
import Post from "../model/post"
import  { Request, Response} from "express";
import imageUpload from "../middleware/cloudinary"
import uploadImage from "../middleware/cloudinary";
let feed = {
    createRecipe: async(req: Request, res: Response) => {
        try {
            const recipeData = {
                userWhoPostId: req.body.userId,
                image: await uploadImage(req.body.pictureOfFood),
                ingridentList: req.body.ingridentList,
                levelOfMeal: req.body.levelOfMeal,
                prepTime: req.body.prepTime
            }
            const createRecipie =  await Post.create(recipeData)
            if (!createRecipie) {
            return res.status(404).json({ status:'404', message:'error is unknown, Please try again!'});
            }
            
        } catch (error) {
            console.log(error)
        }
    },
    commentRecipe: async(req: Request, res: Response) => {
        console.log('hey does this comment stuff work')
    }
}
export default feed