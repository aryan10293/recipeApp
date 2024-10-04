import User from "../model/user";
import Post from "../model/post"
import  { Request, Response} from "express";
let search = {
    iHaveNoName: async (req:Request, res:Response) => {
        let getSearchData:any[];
        const searchText:string = req.body.searchText;

        switch(req.body.searchOption){

            case 'type of chefs':
               getSearchData = await User.find({cookingStyle: { $regex: searchText, $options: "i" }})
                if(!getSearchData){
                    res.status(400).json({status: '400', error:'no users found for that search'})
                } else {
                    res.status(200).json({status: '200', getSearchData}) 
                } 
            break;

            case 'cooks':    // this option:'i' allows us to search for case insensitive  atleast bthatsb what chatgot was teaching me
                getSearchData = await User.find({userName: { $regex: searchText, $options: "i" }})
                if(!getSearchData){
                    res.status(400).json({status: '400', error:'no users found for that search'})
                } else {
                    res.status(200).json({status: '200', getSearchData}) 
                } 
            break;

            case 'meals':
                getSearchData = await Post.find({
                   '$or': [
                    {nameOfDish: { $regex: searchText, $options: "i" }},
                    {ingridentList: { $regex: searchText, $options: "i" }}
                   ]
                })
                if(!getSearchData){
                    res.status(400).json({status: '400', error:'no users found for that search'})
                } else {
                    res.status(200).json({status: '200', getSearchData}) 
                }
            break;

            case 'other':
                // trying search through two collection and asked chat gippity to make the logic 
                const [post, user] = await Promise.all([
                    Post.find({ steps: { $regex: searchText, $options: "i" } }),  
                    User.find({ bio: { $regex: searchText, $options: "i" } })   
                ]);

                 getSearchData = [...post, ...user];

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