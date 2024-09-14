import React, { useContext, useEffect, useState } from "react";
import Header from "../../assets/Header";
import Navbar from "../../assets/Navbar";
import RecipeList from "../../assets/RecipeList";
import useFetch from "../../assets/useFetch";
import useUserId from "../../Utils/useGetUserId";
import RecipeCard from "../../assets/RecipeCard";
import LikeButton from "../../assets/LikeButton";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

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
    const {userUsername:userName,userProfilePicture:profilePicture,userBookmarks:userBookmarks} = useUserId()
    const [recipes,setRecipes] = useState<RecipeCardProps[]>([])

    const getRecipes = async function(id:string){
        try {
            const response = await fetch(`http://localhost:2030/getpost/${id}`)
            const data = await response.json()
            const recipeInfo = await  data.post[0]
            return recipeInfo  
        } catch (error) {
            console.log(error)
            return null
        }
    }

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

    useEffect(()=>{
        createRecipeArray()
        console.log(recipes);
        
    },[userBookmarks])
    

    return ( 
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Navbar userName={userName} userProfilePicture={profilePicture}/>
            <Header margin="0px 0 0 0" text="Saved Recipes"/>
            {userBookmarks && recipes &&
                recipes.map((recipe,index)=>( 
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
                    userID={userID} />
                ))
            }
        </div>
     );
}
 
export default SavedRecipes;