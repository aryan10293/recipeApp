import Navbar from "../../assets/Navbar";
import CreateRecipe from "../../assets/CreateRecipe";
import RecipeList from "../../assets/RecipeList";
import { useEffect, useState } from "react";


const Feed:React.FC = () => {

    const [classState,setClassState] = useState<string>('invisible')
    const [classState2,setClassState2] = useState<string>('invisible')
    const [classState3,setClassState3] = useState<string>('invisible')
    const [recipeVisibility,setRecipeVisibility] = useState<boolean>(false)

    const handleRecipeVisbility = function(){
        recipeVisibility ? setRecipeVisibility(false):setRecipeVisibility(true)

        if(recipeVisibility === false){
            setClassState('create-recipe-box')
            setClassState2('top')
            setClassState3('bottom')
        }
        else{
            setClassState('create-recipe-box-disappear')
            setClassState2('top-disappear')
            setClassState3('bottom-appear')
        }
    }


    useEffect(()=>{
        console.log(recipeVisibility)
    },[recipeVisibility])

    return ( 
     
        <div className="feed">
            <Navbar/>
            <CreateRecipe className={classState} className2={classState2} className3={classState3}/>
            <button className="recipe-box-appear-btn" onClick={handleRecipeVisbility}>Create Recipe</button>
            <h2 style={{'fontSize':'2rem','fontWeight':'300','color':'black','letterSpacing':'2px','borderRadius':'5px','margin':'25px'}}>Recipe Posts</h2>
            <hr style={{'height':'1px','width':'50%','margin':'0px'}} />
            <RecipeList/>
        </div>
     );
}

export default Feed;