import { useState } from "react";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import TimeButton from "./TimeButton";

interface recipeCardProps{
    recipeName:string,
    recipeImage:string,
    recipeTime:number,
    ingridientList:string[],
    steps:string,
    timeOfPost:string,
    likes:string[]
}

const RecipeCard:React.FC<recipeCardProps> = ({recipeName,recipeTime,ingridientList,steps,recipeImage,timeOfPost,likes}) => {
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
                <div className="top-box">
                    <h2 className="recipe-title">{recipeName}</h2>
                    <TimeButton/>
                    <h3 className="recipe-time">{recipeTime}</h3>
                </div>
                <div className="recipe-ingredients">
                    <ul>
                        {ingridientList.map((ingredient,index)=>(
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="right-bottom">
                {/* <h2 className="recipe-steps">{steps}</h2> */}
            
            <div className="interaction-box">
                <LikeButton/> 
                <p>20</p>
                <BookmarkButton/>
            </div>
            </div>



        </div>

    </button>
    
     );
}
 
export default RecipeCard;