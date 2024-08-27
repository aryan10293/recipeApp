import Navbar from "../../assets/Navbar";
import RecipeCard from "../../assets/RecipeCard";
import CreateRecipe from "../../assets/CreateRecipe";
import RecipeList from "../../assets/RecipeList";


const Feed = () => {
    return ( 
        
        <div className="feed">
            <Navbar/>
            <CreateRecipe/>
            <RecipeList/>
        </div>
     );
}

export default Feed;