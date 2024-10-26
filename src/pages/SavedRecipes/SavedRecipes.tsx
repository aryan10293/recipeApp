import { useContext, useEffect, useState } from "react";
import Header from "../../assets/Header";
import Navbar from "../../assets/Navbar";
import RecipeCard from "../../assets/RecipeCard";
import UserContext from "../../contexts/UserContext";
import useGetUserDataFromId from "../../Utils/useGetUserDataFromId";

interface RecipeCardProps{
    recipeName:string,
    recipeImage:string,
    recipeTime:number,
    ingridientList:string[],
    steps?:string,
    timeOfPost:string,
    likes:string[],
    recipeClass:string,
    _id:string,
    levelOfMeal:number,
    postIndex:number
    userID:string | undefined
}
interface Recipe{
    timeOfPost:string,
    nameOfDish:string,
    _id:string
    prepTime:number,
    image:string,
    ingridentList:string[],
    likes:string[],
    levelOfMeal:number,
    steps?:string,
    postIndex:number
}

const SavedRecipes = () => {
    const userID = useContext(UserContext)
    const {userUsername:userName,userProfilePicture:profilePicture,userBookmarks:userBookmarks} = useGetUserDataFromId(userID)
    const [recipes,setRecipes] = useState<RecipeCardProps[]>([])

    // Getting recipes from db
    const getRecipes = async function(id:string){
        try {
            const response = await fetch(`http://localhost:2030/getpost/${id}`)
            const data = await response.json()
            const recipeInfo = data.post[0]
            return recipeInfo  
        } catch (error) {
            console.log(error)
            return null
        }
    }

    // Creating the array of saved recipes 
    const createRecipeArray = async function(){
        try {
            const recipePromises = userBookmarks?.map(async (recipeId)=>{
                return await getRecipes(recipeId);     
            })  
            const recipesArray = await Promise.all(recipePromises || [])
            setRecipes(recipesArray.filter(recipe=>recipe!==null))
            
        } catch (error) {
            console.log(error)
        }
    }

   // Fetching and setting recipes
   const fetching = async function() {
    if (!userBookmarks || userBookmarks.length === 0) {
        return;
    }

    try {
        const s = await Promise.all(
            userBookmarks.map(async (id) => {
                const response = await fetch(`http://localhost:2030/getpost/${id}`);
                const data = await response.json();
                return data.post[0]; // Extract the first post from each response
            })
        );
        setRec(s); // Update the rec state directly
        console.log(s[1]?._id); // Safely log the second item's _id if it exists
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
};
    
    const printingSavedRecipes = function(){
        if(rec.length >0){
            return (
                rec.map((recipe:RecipeCardProps,index:number)=>(
                    <RecipeCard
                        _id={recipe._id}
                        recipeName={recipe.nameOfDish}
                        recipeTime={recipe.prepTime}
                        recipeImage={recipe.image}                  
                        ingridientList={recipe.ingridentList}
                        likes={recipe.likes}
                        timeOfPost={recipe.timeOfPost}
                        recipeClass="recipe-card"
                        levelOfMeal={recipe.levelOfMeal}
                        postIndex={index}
                        userID={userID}
                        />
                ))
            )
        }
        
           
        
    }


    const [rec,setRec] = useState<any>([])
    useEffect(()=>{

        fetching()
        // createRecipeArray()
    },[userBookmarks])





    

    return ( 
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Navbar userName={userName} userProfilePicture={profilePicture}/>
            <Header margin="0px 0 0 0" text="Saved Recipes"/>
            {/* {rec[1]._id &&
                rec?.map((recipe,index)=>( 
                    <RecipeCard 
                    _id={recipe._id}
                    recipeName={recipe.nameOfDish}
                    recipeTime={recipe.prepTime}
                    recipeImage={recipe.image}                  
                    ingridientList={recipe.ingridientList}
                    likes={recipe.likes}
                    timeOfPost={recipe.timeOfPost}
                    recipeClass="recipe-card"
                    levelOfMeal={recipe.levelOfMeal}
                    postIndex={index}
                    userID={userID} />
                ))
            } */}
            {rec.length > 0 && printingSavedRecipes()}
        </div>
     );
}
 
export default SavedRecipes;