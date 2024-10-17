import User from "../model/user";
import Post from "../model/post"
import  { Request, Response} from "express";
import { equals } from "validator";
let search = {
    search: async (req:Request, res:Response) => {
        let getSearchData:any[];
        const searchText:string = req.body.searchText;
        const returnData = (data:any) => {
            if(!data){
                res.status(400).json({status: '400', error:'no users found for that search'})
            } else {
                res.status(200).json({status: '200', data}) 
            } 
        }
        switch(req.body.searchOption){

            case 'type of chefs':
               getSearchData = await User.find({cookingStyle: { $regex: searchText, $options: "i" }})
               returnData(getSearchData) 
            break;

            case 'cooks':    // this option:'i' allows us to search for case insensitive  atleast bthatsb what chatgot was teaching me
                getSearchData = await User.find({userName: { $regex: searchText, $options: "i" }})
                returnData(getSearchData) 
            break;

            case 'meals':
                getSearchData = await Post.find({
                   '$or': [
                    {nameOfDish: { $regex: searchText, $options: "i" }},
                    {ingridentList: { $regex: searchText, $options: "i" }}
                   ]
                })
                returnData(getSearchData) 
            break;

            case 'other':
                // trying search through two collection and asked chat gippity to make the logic 
                const [post, user] = await Promise.all([
                    Post.find({ steps: { $regex: searchText, $options: "i" } }),  
                    User.find({ bio: { $regex: searchText, $options: "i" } })   
                ]);

                 getSearchData = [...post, ...user];

                returnData(getSearchData) 

        }
    },
    mealSearch: async(req:Request, res:Response) => {
        console.log(req.body)
        const conditions: any[] = []
        const cal:number = Number(req.body.maxCal)
        type IngredientCondition = {
            ingridentList: { $regex: RegExp } | { $nin: { $regex: RegExp } };
        };
        interface Search{
             "perServingMacros.calories": number, 
            "perServingMacros.carbs": number, 
            "perServingMacros.fats": number, 
            "perServingMacros.protein": number, 
            $and?: IngredientCondition[]
        } 
        // any solvied all my problems for now
        const searchQuery:any = {
            "perServingMacros.calories": { $lte: req.body.maxCal }, 
            "perServingMacros.carbs": { $lte: req.body.maxCarb }, 
            "perServingMacros.fats": { $lte: req.body.maxFat }, 
            "perServingMacros.protein": { $lte: req.body.maxCal }, 
        }
        if(req.body.ingredients.length >= 1){
            const ingredients = req.body.ingredients.map((ingredient:string) => ({
                ingridentList: { $regex: new RegExp(ingredient, 'i') }  
            }));
            conditions.push({$and: ingredients})
        }

        if(req.body.ingredientsEx.length >= 1){
            const ingredientsEx = req.body.ingredientsEx.map((excludeIngredient:string) => ({
                ingridentList: { $not: { $regex: new RegExp(excludeIngredient, 'i') } } 
            }));
            conditions.push({$and: ingredientsEx})
        }
        if(conditions.length >= 1){
            searchQuery.$and = conditions
        }
        try {
            const meals =  await Post.find(searchQuery)
            if(!meals){
                res.status(400).json({status:'400', error:'i have no idea what would be the problem'})
            } else {
                res.status(200).json({status:'200', meals:meals})
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({error:error})
        }

        // res.status(200).json(req.body)
    }
}
export default search

// const getUsersYouChatedWith = await message.find({
//                 "$or": [
//                     {recieverId:req.body.id},
//                     {senderId:req.body.id}
//                 ]
//             })

// const dateBetweenDates = await Model.find({
//     $and: [
//       { From: { $gte: DateFrom } },
//       { To: { $lte: DateTo } },
//     ]
//   })


// can use below for the macros 
// db.inventory.find ( { quantity: { $in: [40, 1000] } } )

// const query = {
//     "$and": searchTerms.map(term => ({
//         [searchField]: { $regex: term, $options: "i" }  // Case-insensitive regex
//     }))
// };