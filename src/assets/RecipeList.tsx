import { useEffect } from "react";
import useFetch from "./useFetch";
import RecipeCard from "./RecipeCard";

interface RecipeListProps{
    url:string,
    userId:string | null 
}

const RecipeList:React.FC<RecipeListProps> = ({url,userId}) => {

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

    const {data:recipes} = useFetch(url) 
    console.log(recipes)
    return ( 
        <div>
            {userId &&
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
                    postIndex={index}
                    userID={userId}            
                    />}
                    
                </div>
            ))
            }
        </div>
     );
}
 
export default RecipeList;