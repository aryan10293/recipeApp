import Header from "../../assets/Header";
import Navbar from "../../assets/Navbar";
import RecipeList from "../../assets/RecipeList";
import useFetch from "../../assets/useFetch";

const SavedRecipes = () => {

    const {data:data} = useFetch(`http://localhost:2030/getuser/${localStorage.getItem("token")}`)

    const clickHandle = async function() {
        console.log(data.userinfo[0].savedRecipes)
    }

    return ( 
        <div>
            <Navbar/>
            <Header margin="0px 0 0 0" text="Saved Recipes"/>
            <RecipeList url={`http://localhost:2030/getuser/${localStorage.getItem("token")}`} />
            <button onClick={clickHandle}>asdwadas</button>
        </div>
     );
}
 
export default SavedRecipes;