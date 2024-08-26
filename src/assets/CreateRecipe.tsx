import { useState } from "react";

const CreateRecipe = () => {

    const [recipeName,setRecipeName] = useState<string>("")
    const [recipeTime,setrecipeTime] = useState<number>()
    const [recipeSteps,setrecipeSteps] = useState<string>("")

    return ( 
        <div className="create-recipe-box">
            <input placeholder="Recipe Name" type="text" />
            <input placeholder="Recipe Time" type="text" />
            <input placeholder="Recipe Steps" type="text" />
            
            <select name="" id="" >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
     );
}
 
export default CreateRecipe;