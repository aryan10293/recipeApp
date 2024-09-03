import { useEffect } from "react";
import useFetch from "./useFetch";
import RecipeCard from "./RecipeCard";

interface RecipeListProps{
    url:string
}

const RecipeList:React.FC<RecipeListProps> = ({url}) => {

    interface Recipe{
        timeOfPost:string,
        nameOfDish:string,
        _id:string
        prepTime:number,
        image:string,
        ingridentList:string[],
        likes:string[],
        levelOfMeal:number,
        steps?:string

    }

    const {data:recipes} = useFetch(url) 
    console.log(recipes)
    return ( 
        <div className="heydoesthiswork">
            {
            recipes && 
            recipes.post && 
            recipes.post.length && 
            recipes.post.slice().reverse().map((recipe:Recipe,index:number)=>(
                <div  className="asd" key={index}>
                    {<RecipeCard 
                    _id={recipe._id}
                    recipeName={recipe.nameOfDish}
                    recipeTime={recipe.prepTime}
                    recipeImage={recipe.image}                  
                    ingridientList={recipe.ingridentList}
                    likes={recipe.likes}
                    timeOfPost={recipe.timeOfPost}
                    recipeClass="recipe-card"
                    levelOfMeal={recipe.levelOfMeal}
                    
                    />}
                    
                </div>
            ))
            }
        </div>
     );
}
 
export default RecipeList;