import { useLocation } from "react-router-dom";
import DifficultyIcon from "../../assets/DifficultyIcon";
import Navbar from "../../assets/Navbar";
import RecipeCard from "../../assets/RecipeCard";
import TimeButton from "../../assets/TimeButton";
import { useEffect } from "react";

interface RecipeCardProps{
    recipeName:string,
    recipeImage:string,
    recipeTime:number,
    ingridientList:string[],
    steps:string,
    timeOfPost:string,
    likes:string[],
    recipeClass:string,
    _id:string
}


const SingleCard:React.FC<RecipeCardProps> = () => {

    const location = useLocation()
    const {recipe} = location.state || {};

    // if(!recipe){
    //     return <p>Recipe is not found bitch</p>
    // }
    useEffect(()=>{
        console.log("recipe: ",recipe.post[0]);
        
    },[recipe])
    return ( 
        
        <div className="single-card-box">
            <Navbar/>

            {recipe && 
            <RecipeCard  
            likes={[]} 
            steps={recipe.post[0].steps} 
            timeOfPost={'s'} 
            _id="sad"
            recipeClass="single-card" 
            recipeName={recipe.post[0].nameOfDish} 
            recipeTime={recipe.post[0].prepTime} 
            ingridientList={recipe.post[0].ingridentList} 
            recipeImage={recipe.post[0].image}/>
            }



        </div>
     );
}
 
export default SingleCard;