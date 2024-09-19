import User from "../model/user";
import Post from "../model/post"
import  Message  from "../model/messages";
import  { Request, Response} from "express";
import uploadImage from "../middleware/cloudinary";
import { AnyError } from "mongodb";
let profile = {
    updateProfile: async(req: Request, res: Response) => {
        try {
            if(req.body.profilePic === undefined){
                    const getUserAndUpdate = await User.findOneAndUpdate(
                    {_id: req.params.id}, 
                    { 
                        $set: { 
                            bio: req.body.bio,
                            userName: req.body.userName, 
                            skillLevel:req.body.skillLevel, 
                            cooking:req.body.cookingStyle,
                            dob:req.body.dob,
                            country:req.body.country
                        }
                    }
                )
                if(!getUserAndUpdate){
                    res.status(400).json({status:'400', message:'profile without image was not updated'})
                } else {
                    res.status(200).json({status:'200', message:'profile without image was updated'})
                }
            } else {
                const profilePic:any = await uploadImage(req.body.profilePic)
                const getUserAndUpdate = await User.findOneAndUpdate(
                    {_id: req.params.id}, 
                    { 
                        $set: { 
                            profilePic: req.body.profilePic, 
                            bio: req.body.bio,
                            userName: req.body.userName, 
                            skillLevel:req.body.skillLevel, 
                            cookingStyle:req.body.cookingStyle,
                            dob:req.body.dob,
                            country:req.body.country
                        }
                    }
                )
                if(!getUserAndUpdate){
                    res.status(400).json({status:'400', message:'profile with image was not updated'})
                } else {
                    res.status(200).json({status:'200', message:'profile with image was updated'})
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    },
    getBookmarks: async(req:Request,res:Response) => {
        try {
            const getUserBookmarks = await User.findOne({_id:req.params.id})
            if(!getUserBookmarks){
                res.status(400).json({status:'400', message:'error getting your bookmarked post'})
            } else {
                res.status(200).json({status:'200', message:'sucess', bookmarks:getUserBookmarks})
            }
        } catch (error) {
            console.log(error)
        }
    },
    getLikes: async(req:Request,res:Response) => {
        try {
            const getPost:any[] = await Post.find()
            if(!getPost){
                res.status(400).json({status:'400', message:'failure to load post'})
            } else {
                const getUserLikes:any[] = getPost.filter((x:any) => x.likes.includes(req.params.id) ? x : null)
                res.status(200).json({status:200, message:'success getting likes', likedpost:getUserLikes})
            }
        } catch (error) {
           console.log(error) 
        }
    },
    follow: async(req:Request,res:Response) => {
        try {
            const getUser = await User.findByIdAndUpdate(req.params.id, 
                {$push: {followers:req.body.personToFollow}},
                {new:true}
            )
            const getTheUserGettingFollowed = await User.findByIdAndUpdate(req.body.personToFollow, 
                {$push: {followings:req.params.id}},
                {new:true}
            )
            if(!getUser || !getTheUserGettingFollowed){
                res.status(400).json({status:'400', message:'failure to follow user'})
            } else {
                res.status(200).json({status:200, message:'success following user'})
            }
        } catch (error) {
            console.log(error)
        }
    },
    unfollow: async(req:Request,res:Response) => {
        try {
            const getUser = await User.findByIdAndUpdate(req.params.id, 
                {$pull: {followers:req.body.personToFollow}},
                {new:true}
            )
            const getTheUserGettingUnfollowed = await User.findByIdAndUpdate(req.body.personToFollow, 
                {$pull: {followings:req.params.id}},
                {new:true}
            )
            if(!getUser || !getTheUserGettingUnfollowed){
                res.status(400).json({status:'400', message:'failure to unfollow user'})
            } else {
                res.status(200).json({status:200, message:'success following user'})
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export default profile