import mongoose from "mongoose"
import { Schema, Document } from "mongoose";
interface PerServingMacros{
    fats:number,
    carbs:number,
    protein:number,
    calories:number,
}
interface Post extends Document{
    timeOfPost:String,
    id: string,
    image:string,
    ingridentList:string[],
    levelOfMeal: string,
    prepTime: number,
    likes:string[],
    bookmarks: string[],
    nameOfDish:string,
    steps:string,
    fats:number,
    carbs:number,
    protein:number,
    calories:number,
    servings:number,
    perServingMAcros: PerServingMacros
}
const postSchema = new Schema<Post>({
    timeOfPost:{type:String, default: Date.now()},
    nameOfDish:{type:String, required: true},
    userWhoPostId: {type: String, required: true},
    image:{type: String, required: true},
    ingridentList:{type: Array, required: true},
    levelOfMeal: {type: String, required: true},
    prepTime: {type:  Number, required: true},
    likes:{type: Array, default: []},
    bookmarks: {type: Array, default: []},
    steps:{type:String,required:true},
    fats:{type:Number, required:true},
    carbs:{type:Number, required:true},
    protein:{type:Number, required:true},
    servings:{type:Number, required:true},
    calories:{type:Number, required:true},
    perServingMacros: {type:Object, required:true}
})
const Post = mongoose.model<Post>('Post', postSchema);
export default Post