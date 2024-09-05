import Navbar from "../../assets/Navbar";
import CreateRecipe from "../../assets/CreateRecipe";
import RecipeList from "../../assets/RecipeList";
import { useEffect, useState } from "react";
import Header from "../../assets/Header";
import CommentBox from "../../components/CommentBox";
import UserNameButton from "../../components/UsernameButton";
import useUserId from "../../Utils/useGetUserId";


const Feed:React.FC = () => {

    const [classState,setClassState] = useState<string>('invisible')
    const [classState2,setClassState2] = useState<string>('invisible')
    const [classState3,setClassState3] = useState<string>('invisible')
    const [recipeVisibility,setRecipeVisibility] = useState<boolean>(false)
    const [buttonText,setButtonText] = useState<string>("Create Recipe")

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




    const {userId:ID,userUsername:userName,userProfilePicture:userProfilePicture} = useUserId()


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
                {userName && userProfilePicture && <Navbar userName={userName} userProfilePicture={userProfilePicture}/>}
                <CreateRecipe className={classState} className2={classState2} className3={classState3}/>
                {<Header text={'Recipe Posts'} margin="0"/>}
                <button className="recipe-box-appear-btn" onClick={handleRecipeVisbility}>{buttonText}</button>

                {ID && <RecipeList userId={ID} url='http://localhost:2030/getallpost'/>} 
            </div>
     );
}

export default Feed;