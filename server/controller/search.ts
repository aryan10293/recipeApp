import User from "../model/user";
import Post from "../model/post"
import  { Request, Response} from "express";
let search = {
    iHaveNoName: async (req:Request, res:Response) => {
        let getSearchData;
        if(req.body.searchOption === 'type of chefs'){  
            getSearchData = await User.find({cookingStyle: req.body.searchText})
            if(!getSearchData){
                res.status(400).json({status: '400', error:'no users found for that search'})
             } else {
                res.status(200).json({status: '200', getSearchData}) 
             } 
        }
    }
}
export default search

// const getUsersYouChatedWith = await message.find({
//                 "$or": [
//                     {recieverId:req.body.id},
//                     {senderId:req.body.id}
//                 ]
//             })