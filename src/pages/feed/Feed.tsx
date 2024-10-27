import Navbar from "../../assets/Navbar";
import CreateRecipe from "../../assets/CreateRecipe";
import RecipeList from "../../assets/RecipeList";
import React, { useContext, useState } from "react";
import Header from "../../assets/Header";
import UserContext from "../../contexts/UserContext";
import useGetUserDataFromId from "../../Utils/useGetUserDataFromId";
import SlidingButton from "../../components/SlidingButton";


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

    const [showAllPosts,setShowAllPosts] = useState<boolean>(true)
    const [isBtnOnTheLeft,setIsBtnOnTheLeft] = useState<boolean>(true)
    const [headerText,setHeaderText] = useState<string>('All Recipe Posts')


    const handleViewTogglelCick = function(){
        if(showAllPosts){
            setShowAllPosts(false)
            setIsBtnOnTheLeft(false)
            setHeaderText('My Feed')
        }
        else{
            setShowAllPosts(true)
            setIsBtnOnTheLeft(true)
            setHeaderText('Discover Recipes')
        }
        setRecipeNum(5)   
    }




    return ( 
            <div className="feed">       
                {userName && userProfilePicture && <Navbar userId={ID} userName={userName} userProfilePicture={userProfilePicture}/>}
                <CreateRecipe className={classState} className2={classState2} className3={classState3}/>
                {<Header text={headerText} margin="0"/>}
                <button className="recipe-box-appear-btn btn" onClick={handleRecipeVisbility}>{buttonText}</button>
                    {<SlidingButton btnClickHandle={handleViewTogglelCick} btnTextOnTheLeft="My Feed" btnTextOnTheRight="All Posts" isBtnOnTheLeft={isBtnOnTheLeft}/>}
                    
                {ID && <RecipeList showFollow={false} showAllPosts={showAllPosts} recipeNumber={recipeNum} userId={ID} url='http://localhost:2030/getallpost'/> ? <RecipeList showAllPosts={showAllPosts} recipeNumber={recipeNum} userId={ID} url='http://localhost:2030/getallpost'/> : <p className="pending-msg">Loading...</p>} 
                <button className="more-recipe-btn" onClick={handleRecipeNumberButton}>More</button>
            </div>
     );
}

export default Feed;