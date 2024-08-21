import mongoose from "mongoose"
import { Schema, Document } from "mongoose";

interface Comments extends Document{
    timeOfPost:String,
    commentorId: string,
    postId: string,
    likes:string[],
    comment: String,
}
const commentSchema = new Schema<Comments>({
    timeOfPost:{type:String, default: Date.now()},
    commentorId: {type: String, required: true},
    postId: {type: String, required: true},
    comment:{type:String, required:true},
    likes:{type: Array, default: []},
})

export default commentSchema