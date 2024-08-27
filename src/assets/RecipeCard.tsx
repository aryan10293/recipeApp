import { useState } from "react";
import LikeButton from "./LikeButton";

interface recipeCardProps{
    recipeName:string,
    recipeImage:string,
    recipeTime:number,
    ingridientList:string[],
    steps:string,
    timeOfPost:string
}

const RecipeCard:React.FC<recipeCardProps> = ({recipeName,recipeTime,ingridientList,steps,recipeImage,timeOfPost}) => {
    return ( 

    <button className="recipe-card">
        <div className="left-side">

            <div className="left-top">
                <img src={recipeImage}/>
            </div>
{/*             <div className="left-bottom">
                <LikeButton/>
            </div> */}

        </div>
        <div className="right-side">

            <div className="right-top">
                <h2 className="recipe-title">{recipeName}</h2>
                <h3 className="recipe-time">{recipeTime}</h3>
                <div className="recipe-ingredients">
                    <ul>
                        {ingridientList.map((ingredient,index)=>(
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="right-bottom">
                <h2 className="recipe-steps">{steps}</h2>
            </div>

        </div>

    </button>
    
     );
}
 
export default RecipeCard;