import Navbar from "../../Navbar";
import RecipeCard from "../../RecipeCard";


const Feed = () => {
    return ( 
        
        <div className="feed">
            <Navbar/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
        </div>
     );
}

export default Feed;