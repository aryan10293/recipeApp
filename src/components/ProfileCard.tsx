import { faTextHeight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import RecipeCard from "../assets/RecipeCard";
import TimeButton from "../assets/TimeButton";
import DifficultyIcon from "../assets/DifficultyIcon";
import FollowUserButton from "./FollowUserButton";
import PendingMessage from "./PendingMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface ProfileCardProps{
    userName:string | null,
    profilePicture:string | undefined,
    cookingSkill:string | undefined,
    userID:any
    userEmail:string | undefined,
    userCountry:string | undefined,
    userFirstName:string | undefined,
    userLastName:string | undefined,
    cookingStyle:string | undefined,
    dob:string | undefined,
    accountAge: string | undefined,
    bio: string | undefined,
    userFollowerNum:any
    userFollowingNum:any
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
    bio,
    userFollowerNum,
    userFollowingNum
}) => {

    const [usersRecipes,setUsersRecipes] = useState<RecipeCard[]>([])
    const [recipePending,isRecipePending] = useState<boolean>()

    const getUsersRecipes = async function(){
        try {
            isRecipePending(true)
            const recipeResponse = await fetch('https://recipeapp-22ha.onrender.com/getallpost')
            if(!recipeResponse.ok){
                throw new Error('Response is not okay')
            }
            console.log('User Id: ',userID);
            
            const recipeList = await recipeResponse.json()
            const usersRecipesArray:RecipeCard[] = await recipeList.post.filter((recipe:any)=>{
                return recipe.userWhoPostId === userID;
            })

            setUsersRecipes(usersRecipesArray)
            isRecipePending(false)
            console.log(usersRecipesArray);
            
        } catch (error) {
            console.log(error);
        }
    };

    const iconStyle = {
        margin:'0px',
        backgroundColor:'transparent',
        border:'none',
        color:'#f8f5f2',
        fontSize:'1.5rem'
    };

    const renderDifficultyIcon = function(levelNum:number){
        let icons:JSX.Element[] = []
        const levelOfMeal = levelNum
        for(var i:number = 0;i<levelOfMeal;i++){
            icons.push(<DifficultyIcon style={iconStyle} key={i}/>)
        }
        return icons
    };

    const navigate = useNavigate()

    // Navigating to recipe 
    const handleClick = async function(id:string){
        try {
            const response = await fetch(`https://recipeapp-22ha.onrender.com/getpost/${id}`)
            const data = await response.json()
            console.log('data: ',data.post[0]);
            const recipe = data
            
            navigate('/recipe',{state:{recipe:recipe}})
        } catch (error) {
            console.log(error);
        }
    };

    // Printing data 
    const printUsersRecipes = function(recipeArray: RecipeCard[]) {
        
        if (!recipeArray.length) {
            return <p>This user has not posted recipes yet</p>;
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
                            <div className="diff-icons">
                                {renderDifficultyIcon(recipe.levelOfMeal)}
                            </div>
                            
                        </div>
                        
                    </button>
                ))}
            </div>
        );
    };
    const printFollowings = function(followingArray: string[]){
        if(followingArray?.length <= 0){
            return <p>0</p>
        }else{
            return <h4 style={{fontWeight:'400'}} className="following">Followers: {userFollowerNum?.length ? userFollowerNum?.length : <p className="pending-msg">Loading...</p>}</h4>
        }
    };
    const printFollowers = function(followerArray: string[]){
        if(followerArray?.length <= 0){
            return <p>0</p>
        }
        else{
            return <h4 style={{fontWeight:'400'}} className="followers">Following: {userFollowingNum?.length ? userFollowingNum?.length : <p className="pending-msg">Loading...</p>}</h4> 
        }
    };

    useEffect(()=>{
        getUsersRecipes()
        console.log("Followers: ",userFollowerNum)
    },[])

    const followUserButtonStyle:React.CSSProperties = {
        backgroundColor:'transparent',
        position:'relative',
        transform:'scale(1.1)'
    };

    const sendMessageToUser = function(receiverId:string){
        // const navigate = useNavigate()
        navigate(`/messages/${receiverId}`)
    }

    return (
        <div className="profile-card">
            <div className="left">
                <div className="image">
                    <img src={profilePicture} alt="" />
                </div>
                <div className="info">
                    <h2 className="username">{userName ?  userName : <PendingMessage/>}</h2>
                    <h3 className="cooking-skill">{cookingSkill ? cookingSkill : <PendingMessage/>  }</h3>                    
                    <h3 className="cooking-style">{cookingStyle ? cookingStyle : <PendingMessage/>  }</h3>
                    <h3 className="country">{userCountry ? userCountry : <PendingMessage/>}</h3>
                    <h3 className="dob">{dob ? dob : <PendingMessage/>}</h3>
                    
                </div>
                <div className="follow-data">
                    {printFollowings(userFollowingNum)}
                    {printFollowers(userFollowerNum)}
                </div>
                <div className="follow-message-box mt-5">
                    {userID && <FollowUserButton followClass="follow-btn flex flex-col items-center" personToFollow={userID}/>}
                    <button onClick={(e)=>sendMessageToUser(userID)} className="message-user-btn"><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon></button>
                </div>
            </div>
            <div className="right">
                <div style={{overflow:'auto'}} className="bio" >
                    <h3 style={{fontWeight:'500'}}>{userName ? userName+ `'s bio` : <PendingMessage/>}</h3>
                    <hr />
                    <p>{bio ? bio : <PendingMessage/>}</p>
                </div>
                <div className="recipes">   
                    <h3 style={{fontWeight:'500'}}>{userName}'s posted recipes({usersRecipes.length})</h3>
                    <hr />
                    {recipePending ? <PendingMessage/>: printUsersRecipes(usersRecipes)}
  
                    
                </div>
                
            </div>
        </div>
     );
}
 
export default ProfileCard;