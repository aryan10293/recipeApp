import { faTextHeight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    accountAge: string | undefined,
    bio: string | undefined
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
    userID,
    bio
}) => {

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

    const navigate = useNavigate()

    const handleClick = async function(id:string){
        try {
            const response = await fetch(`http://localhost:2030/getpost/${id}`)
            const data = await response.json()
            console.log('data: ',data.post[0]);
            const recipe = data
            
            navigate('/recipe',{state:{recipe:recipe}})
        } catch (error) {
            console.log(error);
            
        }
    }

    const printUsersRecipes = function(recipeArray: RecipeCard[]) {
        if (!recipeArray.length) {
            return <p>No recipes found.</p>;
        }

        return (
            <div className="recipe-list-container">
                
                {recipeArray.map((recipe)=>(
                    <button onClick={(e)=> handleClick(recipe._id)} className="user-recipe-list-container" key={recipe._id}>
                        <hr style={{height:'25%',width:'0px', border:'1px solid #f45d48 ',position:'relative',bottom:'-25px',left:'10px'}}/>  
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
                    
                </div>
                <div className="follow-data">
                    <h4 style={{fontWeight:'400'}} className="following">Followers: 20</h4>
                    <h4 style={{fontWeight:'400'}} className="followers">Following: 45</h4>
                </div>
                {/* <h3 style={{fontWeight:'400'}} className="date-of-registry">Member since: {'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'} {accountAge?.split('T')[0]}</h3> */}
            </div>
            <div className="right">
                <div style={{overflow:'auto'}} className="bio" >
                    <h3 style={{fontWeight:'500'}}>{userName + `'s bio`}</h3>
                    <hr />
                    <p>{bio}</p>
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