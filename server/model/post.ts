import mongoose from "mongoose"
import { Schema, Document } from "mongoose";

interface Post extends Document{
    timeOfPost:String,
    id: string,
    image:string,
    ingridentList:string,
    levelOfMeal: string,
    prepTime: number,
    likes:string[]
    bookmarks: string[]
}
const postSchema = new Schema<Post>({
    timeOfPost:{type:String, default: Date.now()},
    id: {type: String, required: true},
    image:{type: String, required: true},
    ingridentList:{type: String, required: true},
    levelOfMeal: {type: String, required: true},
    prepTime: {type:  Number, required: true},
    likes:{type: Array, default: []},
    bookmarks: {type: Array, default: []}
})
export default postSchema