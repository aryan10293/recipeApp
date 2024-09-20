import User from "../model/user";
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
    },
    createMessage: async (req:Request, res:Response) => {
        let img:string | unknown;

        if(req.body.imgString === ''){
            img = ''
        } else {
            try {
                img = await uploadImage(req.body.imgString as string)
            } catch (error) {
                console.log(error)
            }
        }
        interface Message{
            message:string,
            senderId: string,
            recieverId: string,
            chatId:string,
            imgString: string | unknown,
        }
        const createMessage:Message = {
            message:req.body.message,
            senderId: req.body.senderId,
            recieverId: req.body.recieverId,
            chatId:req.body.chatRoomId,
            imgString: img
        }

        const addMessageToDatabase = await message.create(createMessage)
        if(!addMessageToDatabase){
            res.status(400).json({status:'400', message:'failure to add message to database'})
        } else {
            res.status(200).json({status:'200', message:'success in addding message to database'})
        }
    },
    getMessagesFromChatRoom: async (req:Request, res:Response) => {
        const getMessages = await message.find({chatId: req.params.chatRoomId})
        if(!getMessages){
            res.status(400).json({status:'400', message:'error loaidng message'})
        } else {
            res.status(200).json({status:'200', message:'sucess loading message', messages: getMessages, wfrwc:req.params.chatRoomId})
        }
    }, likeMessage: async (req:Request, res:Response) => {
        try {
            const getMessage = await message.findByIdAndUpdate(req.params.messageId, {liked: true})
            if(!getMessage){
                res.status(400).json({status:'400', message:'failure to like message'})
            } else {
                res.status(200).json({status:'200', message:'success liking the message'})
            }
        } catch (error) {
            console.log(error)
        }
    }

}
export default messages