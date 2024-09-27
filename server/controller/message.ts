import User from "../model/user";
import message from "../model/messages"
import  { Request, Response} from "express";
import uploadImage from "../middleware/cloudinary";
let messages = {
    getUser: async(req:Request, res:Response) => {
        try {
            const getUser = await User.find({

                "$or": [
                    // use userName if you want to see older users
                    {usernameSearch:{$regex:req.body.search.toLowerCase()}}
                ]
            })
            res.status(200).json({status:'200', data:getUser})
        } catch (error:any) {
            console.error('Error fetching user:', error);
            return res.status(500).json({ status: '500', message: 'Server error', error: error.message });
        }
    },
    //testing below
    getAllUsers: async (req:Request, res:Response) => {
        const user = await User.find()
        res.json(user)
    },
    //testing above
    getMessageHistory: async (req:Request, res:Response) => {
        try {
            let checkkForDupObj = {}

            const queryDataBase = async (id:string) => {
                return await User.find({_id: id})
            }

            const getUsersYouChatedWith = await message.find({
                "$or": [
                    {recieverId:req.body.id},
                    {senderId:req.body.id}
                ]
            })
            getUsersYouChatedWith.forEach((x:any) => {
                if(x.senderId !== req.body.id){
                    if(!checkkForDupObj[x.senderId]){
                        checkkForDupObj[x.senderId] = x.senderId
                    }
                } else {
                    if(!checkkForDupObj[x.recieverId]){
                        checkkForDupObj[x.recieverId] = x.recieverId
                    }
                }
            })
            const getTheUserDocumentsYouChatedWith = await Promise.all(Object.keys(checkkForDupObj).map(async (id:any, i:number) => {
                return queryDataBase(id)
            }))
            
            res.status(200).json(getTheUserDocumentsYouChatedWith)
        } catch (error:any) {
            console.log(error)
            res.status(500).json({ status: '500', message: 'Server error', error: error.message });
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
    }, 
    likeMessage: async (req:Request, res:Response) => {
        const fieldsToUpDateAndTurnFalse:string[] = ['laugh', 'emphasize', 'like', 'dislike', 'heart', 'question'].filter((x:string) => req.params.apicall !== x ? x : null)
        const updateData = {}
        fieldsToUpDateAndTurnFalse.map((x:string) => {
            updateData[x] = false
        })
        updateData[req.params.apicall] = true
        try {
            const getMessage = await message.findByIdAndUpdate(req.params.messageId, updateData)
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