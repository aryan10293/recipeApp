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
            steps={"Gather all ingredients and preheat the oven to 350 degrees F (175 degrees C).Trim stems from zucchini and slice lengthwise. Scoop out seeds and place them in a large bowl. Add sausage, bread crumbs, Parmesan cheese, and garlic; mix to combine.Stuff squash with sausage mixture and arrange in a 9x13-inch baking pan. Pour spaghetti sauce over the top and cover with aluminum foil.Bake in the preheated oven until sausage is browned and cooked through, about 45 minutes. Remove foil and sprinkle with mozzarella cheese; continue to cook until cheese is melted, about 15 minutes more.Enjoy!"} 
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