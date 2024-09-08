import { faTextHeight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RecipeCard from "../assets/RecipeCard";
import TimeButton from "../assets/TimeButton";
import DifficultyIcon from "../assets/DifficultyIcon";

interface ProfileCardProps{
    userName:string | null,
    profilePicture:string | undefined,
    cookingSkill:string | undefined,
    userID:string | undefined
    userEmail:string | undefined,
    userCountry:string | undefined,
    userFirstName:string | undefined,
    userLastName:string | undefined,
    cookingStyle:string | undefined,
    dob:string | undefined,
    accountAge: string | undefined
}

interface RecipeCard{
    nameOfDish:string,
    image:string,
    prepTime:number,
    ingridientList:string[],
    steps?:string,
    timeOfPost:string,
    likes:string[],
    recipeClass:string,
    _id:string,
    levelOfMeal:number,
    postIndex:number
    userID:string | undefined,
}

const ProfileCard:React.FC<ProfileCardProps> = ({
    //props
    userFirstName,
    userLastName,
    userEmail,
    userCountry,
    userName,
    profilePicture,
    cookingSkill,
    cookingStyle,
    accountAge,
    dob,
    userID
}) => {

    const location = useLocation()
    const {userId} = location.state || {}

    const [usersRecipes,setUsersRecipes] = useState<RecipeCard[]>([])
 
    const getUsersRecipes = async function(){
        try {
            const recipeResponse = await fetch('http://localhost:2030/getallpost')
            if(!recipeResponse.ok){
                throw new Error('Response is not okay')
            }
            console.log('User Id: ',userID);
            
            const recipeList = await recipeResponse.json()
            const usersRecipesArray:RecipeCard[] = await recipeList.post.filter((recipe:any)=>{
                return recipe.userWhoPostId === userID;
            })

            setUsersRecipes(usersRecipesArray)
            console.log(usersRecipesArray);
            
        } catch (error) {
            console.log(error);
        }
    }

    const iconStyle = {
        margin:'0px',
        backgroundColor:'transparent',
        border:'none',
        color:'#f8f5f2',
        fontSize:'1.5rem'
    }

    const renderDifficultyIcon = function(levelNum:number){
        let icons:JSX.Element[] = []
        const levelOfMeal = levelNum
        for(var i:number = 0;i<levelOfMeal;i++){
            icons.push(<DifficultyIcon style={iconStyle} key={i}/>)
        }
        return icons
    }

    const printUsersRecipes = function(recipeArray: RecipeCard[]) {
        if (!recipeArray.length) {
            return <p>No recipes found.</p>;
        }

        return (
            <div className="recipe-list-container">
                
                {recipeArray.map((recipe)=>(
                    <button className="user-recipe-list-container" key={recipe._id}>
                        <hr />
                        <div className="left">
                            <img src={recipe.image} alt="" />
                        </div>
                        <div className="right">
                            <h3 className="name-of-dish">{recipe.nameOfDish}</h3>
                            <h3 className="time-img" ><TimeButton/></h3>
                            <h3  className="prep-time">{recipe.prepTime}</h3>
                            {renderDifficultyIcon(recipe.levelOfMeal)}
                        </div>
                        
                    </button>
                ))}
            </div>
        );
     };

    
    useEffect(()=>{
        getUsersRecipes()
    },[])

    return (
        
        <div className="profile-card">
            <div className="left">
                <div className="image">
                    <img src={profilePicture} alt="" />
                </div>
                <div className="info">
                    <h2 className="username">{userName}</h2>
                    <h3 className="cooking-skill">{cookingSkill}</h3>                    
                    <h3 className="cooking-style">{cookingStyle}</h3>
                    <h3 className="country">{userCountry}</h3>
                    <h3 className="dob">1995-04-03</h3>
                    <h3 className="date-of-registry">Member since: {'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'} {accountAge?.split('T')[0]}</h3>
                </div>
                <div className="follow-data">
                    <h4 className="following">20</h4>
                    <h4 className="followers">45</h4>
                </div>
            </div>
            <div className="right">
                <div className="bio">
                    <h3 style={{fontWeight:'500'}}>{userName + `'s bio`}</h3>
                    <hr />
                    <p>"Hey, I’m Alex, the founder of Spark Innovations. I started this company to create smart home devices that make life easier and more enjoyable. With a background in engineering and a passion for tech, I love turning innovative ideas into reality. When I’m not working, you can find me exploring the outdoors or experimenting with new recipes in the kitchen."</p>
                </div>
                <div className="recipes">   
                    <h3 style={{fontWeight:'500'}}>{userName}'s posted recipes({usersRecipes.length})</h3>
                    <hr />
                    {printUsersRecipes(usersRecipes)}
  
                    
                </div>
                
            </div>
        </div>
     );
}
 
export default ProfileCard;