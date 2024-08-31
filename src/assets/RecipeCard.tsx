import { useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import TimeButton from "./TimeButton";
import useFetch from "./useFetch";
import { Link, useNavigate } from "react-router-dom";
import DifficultyIcon from "./DifficultyIcon";
import { icon } from "@fortawesome/fontawesome-svg-core";



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
    levelOfMeal:number
}

const RecipeCard:React.FC<RecipeCardProps> = ({_id,recipeClass,recipeName,recipeTime,ingridientList,steps,recipeImage,timeOfPost,likes,levelOfMeal}) => {

        const [url,setUrl] = useState<string>("")
        const {data:recipe} = useFetch(url)
        const navigate = useNavigate()

        const handleClick = async function(){

            setUrl(`http://localhost:2030/getpost/${_id}`)
            
        }

        useEffect(()=>{
            if(recipe){
                navigate("/recipe",{state:{recipe}})
                console.log(recipe)
            }
        },[recipe,recipe])

        const iconStyle = {
            margin:'0px',
            backgroundColor:'transparent',
            border:'none'
        }

        const renderIcon = function(){
            let icons:JSX.Element[] = []
            for(var i:number = 0;i<levelOfMeal;i++){
                icons.push(<DifficultyIcon style={iconStyle} key={i}/>)
            }
            return icons
        }
          
       
    return ( 

    <button onClick={handleClick} className={recipeClass}>
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
                    <div className="recipe-skill-box">
                     {renderIcon()}
                    </div>
                    
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
                <h2 className="recipe-steps">{steps}</h2>
            
            <div className="interaction-box">
                <LikeButton/> 
                <p>{likes}</p>
                <BookmarkButton/>
            </div>
            </div>



        </div>

    </button>
    
     );
}
 
export default RecipeCard;