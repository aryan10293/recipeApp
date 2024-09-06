import User from "../model/user";
import Post from "../model/post"
import message from "../model/messages"
import  { Request, Response} from "express";
import uploadImage from "../middleware/cloudinary";
let messages = {
    getUser: async(req:Request, res:Response) => {
        const getUser = await User.find()
        if(!getUser){
            res.status(400).json({status:'400', message:'couldnt get users'})
        } else {
           res.status(200).json({status:'200', message:'sucess', users:getUser}) 
        }
    }

}
export default messages