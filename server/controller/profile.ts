import User from "../model/user";
import Post from "../model/post"
import  { Request, Response} from "express";
import uploadImage from "../middleware/cloudinary";
let profile = {
    updateProfile: async(req: Request, res: Response) => {
        try {
            if(req.body.profiePic === undefined){
                    const getUserAndUpdate = await User.findOneAndUpdate(
                    {_id: req.params.id}, 
                    { 
                        $set: { 
                            bio: req.body.bio, userName: req.body.userName, 
                            skillLevel:req.body.skillLevel, 
                            cooking:req.body.cookingStyle
                        }
                    }
                )
                if(!getUserAndUpdate){
                    res.status(400).json({status:'400', message:'profile was not updated'})
                } else {
                    res.status(200).json({status:'200', message:'profile was updated'})
                }
            } else {
                const getUserAndUpdate = await User.findOneAndUpdate(
                    {_id: req.params.id}, 
                    { 
                        $set: { 
                            img: await uploadImage(req.body.profilePic), 
                            bio: req.body.bio, userName: req.body.userName, 
                            skillLevel:req.body.skillLevel, 
                            cooking:req.body.cookingStyle
                        }
                    }
                )
                if(!getUserAndUpdate){
                    res.status(400).json({status:'400', message:'profile was not updated'})
                } else {
                    res.status(200).json({status:'200', message:'profile was updated'})
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }

}
export default profile