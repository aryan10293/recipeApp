import Navbar from "../../assets/Navbar";
import CreateRecipe from "../../assets/CreateRecipe";
import RecipeList from "../../assets/RecipeList";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../assets/Header";
import CommentBox from "../../components/CommentBox";
import UserNameButton from "../../components/UsernameButton";
import useUserId from "../../Utils/useGetUserId";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import useGetUserDataFromId from "../../Utils/useGetUserDataFromId";
import { faL, faSearch } from "@fortawesome/free-solid-svg-icons";


const Feed:React.FC = () => {

    const [classState,setClassState] = useState<string>('invisible')
    const [classState2,setClassState2] = useState<string>('invisible')
    const [classState3,setClassState3] = useState<string>('invisible')
    const [recipeVisibility,setRecipeVisibility] = useState<boolean>(false)
    const [buttonText,setButtonText] = useState<string>("Create Recipe")

    const [recipeNum,setRecipeNum] = useState<number>(5)

    // Set the number of recipes rendered
    const handleRecipeNumberButton = function(){
        setRecipeNum(recipeNum+5) 
    }

    const handleRecipeVisbility = function(){
        recipeVisibility ? setRecipeVisibility(false):setRecipeVisibility(true)

        if(recipeVisibility === false){
            setClassState('create-recipe-box')
            setClassState2('top')
            setClassState3('bottom')
            setButtonText("Hide Recipe Creation")
        }
        else{
            setClassState('create-recipe-box-disappear')
            setClassState2('top-disappear')
            setClassState3('bottom-disappear')
            setButtonText("Create Recipe")
        }
    }

    const userId = useContext(UserContext)
    // const {userId:ID,userUsername:userName,userProfilePicture:userProfilePicture,userBookmarks:userBookmarks} = useUserId()
    const {userId:ID,userUsername:userName,userProfilePicture:userProfilePicture,userBookmarks:userBookmarks} = useGetUserDataFromId(userId)

    // useEffect(()=>{
    //     console.log('Context ID: ',userId);
        
    // },[])

    const buttonStyle1:React.CSSProperties = {
        margin:'0 0 0 0',
        backgroundColor: '#f45d48',  
        width:'20px',
        height:'20px',
        borderRadius:'100%',
        position:'relative',
        left:'5px',
        padding: '0',
        border:'1px solid black '
    }
    const buttonStyle2:React.CSSProperties = {
        margin:'0 0 0 0',
        backgroundColor: '#f45d48',  
        width:'20px',
        height:'20px',
        borderRadius:'100%',
        position:'relative',
        left:'-60px',
        padding: '0',
        border:'1px solid black '
    }
    const textStyle1:React.CSSProperties = {
        fontSize:'0.6rem',
        color:'black',
        fontWeight:'300',
        fontStyle:'italic',
        position:'relative',
        // bottom:'-25px',
        left:'20px'

    }
    const textStyle2:React.CSSProperties = {
        fontSize:'0.6rem',
        color:'black',
        fontWeight:'300',
        fontStyle:'italic',
        position:'relative',
        // bottom:'25px',
        left:'-5px'
    }

    const [showAllPosts,setShowAllPosts] = useState<boolean>(true)
    const [buttonStyle,setButtonStyle] = useState<React.CSSProperties>(buttonStyle1)
    const [textStyle,setTextStyle] = useState<React.CSSProperties>(textStyle2)



    const handleViewTogglelick = function(){
        if(showAllPosts){
            setShowAllPosts(false)
            setButtonStyle(buttonStyle2)
            setTextStyle(textStyle1)
        }
        else{
            setShowAllPosts(true)
            setButtonStyle(buttonStyle1)
            setTextStyle(textStyle2)
        }
        setRecipeNum(5)   
    }

    return (
     
        // <div className="feed">       
        //     <Navbar/>
        //     <CreateRecipe className={classState} className2={classState2} className3={classState3}/>
        //     <Header text="Recipe Posts" margin="0"/>
        //     {/* <h2 style={{'fontSize':'2rem','fontWeight':'300','color':'black','letterSpacing':'2px','borderRadius':'5px','margin':'25px'}}>Recipe Posts</h2>
        //     <hr style={{'height':'1px','width':'50%','margin':'0px'}} /> */}
        //     <button className="recipe-box-appear-btn" onClick={handleRecipeVisbility}>{buttonText}</button>
        //     <RecipeList url='http://localhost:2030/getallpost'/>
        //     {/* <CommentBox/> */}   
        //     <UserNameButton text="Click me"/>
        // </div>
            <div className="feed">       
                {userName && userProfilePicture && <Navbar userId={ID} userName={userName} userProfilePicture={userProfilePicture}/>}
                <CreateRecipe className={classState} className2={classState2} className3={classState3}/>
                {<Header text={'Recipe Posts'} margin="0"/>}
                <button className="recipe-box-appear-btn" onClick={handleRecipeVisbility}>{buttonText}</button>
                <div className="post-toggle-box">
                    <p style={textStyle}>{showAllPosts ?  'Show My Feed' : 'Show All Posts'}</p>
                    <button className="all-post-toggle" style={buttonStyle} onClick={handleViewToggleClick}></button>
                </div> 
                {ID && <RecipeList showAllPosts={showAllPosts} recipeNumber={recipeNum} userId={ID} url='http://localhost:2030/getallpost'/> ? <RecipeList showAllPosts={showAllPosts} recipeNumber={recipeNum} userId={ID} url='http://localhost:2030/getallpost'/> : <p className="pending-msg">Loading...</p>} 
                <button className="more-recipe-btn" onClick={handleRecipeNumberButton}>More</button>
            </div>
     );
}

export default Feed;