import { useEffect, useState } from "react";

const CreateRecipe = () => {

    interface recipe{
        timeOfPost:string,
        id: string,
        image:string,
        ingridentList:string[],
        levelOfMeal: string,
        prepTime: number,
        likes:string[],
        bookmarks: string[],
        nameOfDish:string,
    }

    const postRecipe = function(e:React.SyntheticEvent){
        e.preventDefault()
        const newRecipe:recipe= {
            timeOfPost:new Date().toISOString(),
            id: "21v",
            image:"2vad",
            ingridentList:ingredients,
            levelOfMeal: recipeSkill,
            prepTime: recipeTime,
            likes:[],
            bookmarks:[],
            nameOfDish:recipeName,
        }

        fetch("http://localhost:2030/createrecipe",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newRecipe)
        })
        .then((response)=>{
            if(!response.ok){
                throw Error("Response is not Okay")
            }
            console.log(newRecipe)
            return response.json()
        })
        .then((data)=>{
            
            console.log("Success!",data)
        })
        .catch((err)=>{
            console.log("Failed",err.message)
        })
            
    }


    const [recipeName,setRecipeName] = useState<string>("")
    const [recipeTime,setRecipeTime] = useState<number>(0)
    const [recipeSteps,setRecipeSteps] = useState<string>("")
    const [recipeSkill,setRecipeSkill] = useState<string>("")

    const [ingredients,setIngredients] = useState<string[]>([])
    const [newIngredient,setNewIngredient] = useState<string>("")

    const ingredientClickHandle = function(e:React.SyntheticEvent){

        e.preventDefault()
        console.log("Adding ingredient: " + newIngredient)
        setIngredients([...ingredients,newIngredient])
        

    }

    useEffect(()=>{
        console.log(ingredients)
        
        
    },[ingredients])



    return ( 
        <form className="create-recipe-box">
            <div className="top">

            <div className="top-left">

            </div>

            <div className="top-right">
                <div className="recipe-name-box">
                    <input onChange={(e)=>setRecipeName(e.target.value)} className="recipe-name input-fields" placeholder="Recipe Name" type="text" />
                </div>

                <div className="block">
                    <input onChange={(e)=>setRecipeTime(Number(e.target.value))} className="recipe-time input-fields" placeholder="Recipe Time In Minutes" type="text" />
                    <select onChange={(e)=>setRecipeSkill(e.target.value)} className="skill-level input-fields" name="" id="" >
                        <option value="">Choose Skill Level</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div className="ingredients-input">
                    <input className="ingredient" onChange={((e)=>setNewIngredient(e.target.value))} placeholder="2 onions.." type="text" />
                    <button className="ingredient-btn" onClick={(e)=>ingredientClickHandle(e)}>Add Ingredient</button>
                </div>
                
            </div>

            </div>
            <div className="bottom">

                <div className="ingredients">
                    <ul className="ingredients-list">
                        {ingredients.map((ingredient)=>(
                            <li key={ingredient}>
                                {ingredient}
                            </li>                                                   
                        ))}
                    </ul>
                </div>

            <textarea onChange={(e)=>{setRecipeSteps(e.target.value)}} className="recipe-steps" placeholder="Recipe Steps" name="" id=""></textarea>     
            <button onClick={(e)=>postRecipe(e)} className="create-recipe-btn">Create Recipe</button>
            
            </div>


        </form>
     );
}
 
export default CreateRecipe;