import mongoose from "mongoose"
import { Schema, Document } from "mongoose";

interface Message extends Document{
    message:String,
    senderId: string,
    recieverId:string,
    chatId:string,
    time: string,
    edited: boolean,
    liked:boolean,
    deleted: boolean,
    imgstring:string,
}

const messageSchema = new Schema<Message>({
    time:{type:String, default: Date.now()},
    message:{type:String, required: true},
    senderId: {type: String, required: true},
    recieverId:{type: String, required: true},
    chatId:{type: String, required: true},
    edited: {type: Boolean, default: false},
    heart: {type:  Boolean, default:false},
    like: {type:  Boolean, default:false},
    dislike: {type:  Boolean, default:false},
    emphasize: {type:  Boolean, default:false},
    laugh: {type:  Boolean, default:false},
    question: {type:  Boolean, default:false},
    deleted: {type: Boolean, default: false},
    imgString: {type: String, required: false}
})

const Message = mongoose.model<Message>('Message', messageSchema);
export default Message