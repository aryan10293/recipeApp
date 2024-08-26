import Navbar from "../../assets/Navbar";
import RecipeCard from "../../assets/RecipeCard";
import CreateRecipe from "../../assets/CreateRecipe";


const Feed = () => {
    return ( 
        
        <div className="feed">
            <Navbar/>
            <CreateRecipe/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
        </div>
     );
}

export default Feed;