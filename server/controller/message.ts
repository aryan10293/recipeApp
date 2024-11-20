import User from "../model/user";
import message from "../model/messages"
import  { Request, response, Response} from "express";
import uploadImage from "../middleware/cloudinary";
const messageHistory = async (req:Request, res:Response) => {
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
            return getTheUserDocumentsYouChatedWith
        } catch (error:any) {
            console.error(error)
            return { status: '500', message: 'Server error', error: error.message };
        }
    }



let messages = {
    getUser: async(req:Request, res:Response) => {
        let sendFoundUsersToClient:any = []
        let lmao = await messageHistory(req,res)
        for(let key in lmao){
            if(lmao[key][0].userName.includes(req.body.search)){
                sendFoundUsersToClient.push(lmao[key])
            }
        }
        if(sendFoundUsersToClient.length){
            res.status(200).json({status:'200', searchedUsers:sendFoundUsersToClient})
        } else {
            res.status(400).json({status:'400', searchedUsers:'no users found'})
        }
    },

    getMessageHistory: async (req:Request,res:Response) => {
        res.status(200).json({status:'200', chatHistory:  await messageHistory(req,res)})
    },
    createMessage: async (req:Request, res:Response) => {
        let img:string | unknown;

        if(req.body.imgString === ''){
            img = ''
        } else {
            try {
                img = await uploadImage(req.body.imgString as string)
            } catch (error) {
                console.error(error)
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
            console.error(error)
        }
    }
}
export default messages