import { useEffect } from "react";
import useFetch from "./useFetch";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {

    interface Recipe{
        timeOfPost:string,
        nameOfDish:string,
        _id:string
        prepTime:number,
        image:string,
        ingridentList:string[]
        

    }

    const {data:recipes} = useFetch('http://localhost:2030/getallpost')
     

    return ( 
        <div>
            {
            recipes && 
            recipes.post && 
            recipes.post.length && 
            recipes.post.map((recipe:Recipe)=>(
                <div key={recipe._id}>
                    {<RecipeCard 
                    recipeName={recipe.nameOfDish}
                    recipeTime={recipe.prepTime}
                    recipeImage={recipe.image}
                    steps={"asdwads"}
                    ingridientList={recipe.ingridentList}
                    
                    timeOfPost={recipe.timeOfPost}
                    
                    />}
                    
                </div>
            ))
            }
        </div>
     );
}
 
export default RecipeList;