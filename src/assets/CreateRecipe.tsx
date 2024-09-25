import React, { KeyboardEventHandler, useContext, useEffect, useState } from "react";
import {encode as base64_encode} from "base-64";
import useUserId from "../Utils/useGetUserId";
import UserContext from "../contexts/UserContext";

interface classNameProps{
    className:string,
    className2:string,
    className3:string
}



const CreateRecipe:React.FC<classNameProps> = ({className,className2,className3}) => {

 
    const [recipeName,setRecipeName] = useState<string>("")
    const [recipeTime,setRecipeTime] = useState<number>(0)
    const [steps,setSteps] = useState<string>("")
    const [recipeSkill,setRecipeSkill] = useState<string>("")

    const [uploadedImage,setUploadedImage] = useState<File | undefined>()
    const [convertedImage,setconvertedImage] = useState<string>("")

    const [ingredients,setIngredients] = useState<string[]>([])
    // added measurements and macros gto our state management
    const [newIngredient,setNewIngredient] = useState<string>("")
    const [newMeasurement, setNewMeasurement] = useState<string>("")
    const [fats, setFats] = useState<number>(0)
    const [carbs, setCarbs] = useState<number>(0)
    const [protein, setProtein] = useState<number>(0)
    const [calories, setCalories] = useState<number>(0)
    const [servings, setServings] = useState<number>(1)
    // using a object because it was easier for me to keep track of ingredient data than with an array
    const [ingredientListToTrackMacros, setIngredientListToTrackMacros] = useState<any>({})
    const [isPending,setIsPending] = useState<boolean>(false)
    const [postButtonText,setPostButtonText] = useState<string>("Post Recipe")

    const[data,setData] = useState()
    const userId = useContext(UserContext)

    const ingredientClickHandle = function(e:React.MouseEvent<HTMLButtonElement>){

        // e.preventDefault()
        if(newIngredient === ""){
            console.log('Cannot be empty')
        }
        else{
            getItemFromNutritionApi()
            console.log("Adding ingredient: " + newIngredient + newMeasurement)
            setIngredients([...ingredients,newIngredient])
            setNewIngredient("")
        }   
    }

    const removeIngredientFromList = function(index:number){ 
        // i put the ingredient in a array because to loop thropugh the array and delete the key from the object
        const ingredientToDelete:string[] = [ingredients[index]]

        // idk why i do the below after reviewing the code but it works and doesnt mess uo state management
        let dupOfIngredientListToTrackMacros:any = ingredientListToTrackMacros

        // made this conditonal because of a werid bug when some macros would go below 0 when deleteing last ingredient
        if(Object.keys(dupOfIngredientListToTrackMacros).length === 1){
            setFats(0)
            setCarbs(0)
            setProtein(0) 
            setCalories(0) 
        } else {
            setFats(fats - dupOfIngredientListToTrackMacros[ingredients[index]].fats)
            setCarbs(carbs - dupOfIngredientListToTrackMacros[ingredients[index]].carbs)
            setProtein(protein - dupOfIngredientListToTrackMacros[ingredients[index]].protein) 
            setCalories(calories - dupOfIngredientListToTrackMacros[ingredients[index]].calories) 
        }

        ingredientToDelete.forEach(Reflect.deleteProperty.bind(null, dupOfIngredientListToTrackMacros));
        console.log(`deleted ${ingredients[index]}`, dupOfIngredientListToTrackMacros)

        setIngredients(ingredients.filter((ingredient,i)=>{
            return i !== index
        })) 

        // now im setting our obj on the ingredient macros to equal the new object i made inside this function 
        // that deletes the clicked on item
        setIngredientListToTrackMacros(dupOfIngredientListToTrackMacros)
    }
    interface PerServingMacros{
        fats:number,
        carbs:number,
        protein:number,
        calories:number,
    }
    interface recipe{
        timeOfPost:string,
        userId: string,
        pictureOfFood:string,
        ingridentList:string[],
        levelOfMeal: string,
        prepTime: number,
        likes:string[],
        bookmarks: string[],
        title:string,
        steps:string,
        fats:number,
        carbs:number,
        protein:number,
        calories:number,
        servings:number,
        perServingMacros:PerServingMacros
    }

    const handleImageUpload = async function(){
        if(e.target.files && e.target.files.length !== 0){
            const file = e.target.files[0]
            setUploadedImage(file)
            const base64Image = await base64_encode(file)
            setconvertedImage(base64Image)
        }
    }
    // this condiional is so users cant set servings below 1
    if(servings < 1 ){
            setServings(1)
    }
    //
    const base64_encode = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const getItemFromNutritionApi = async () => {
      const ingredientsNutionalValue = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${newMeasurement.trim()} ${newIngredient.trim()}`, {
        method: 'GET', 
        headers: {'Content-Type': 'application/json', 'X-Api-Key': '8pLrOYMK4igtQtUKLWk8OQ==IVs7lNVLdtSfiuDs'},
      })

      const ingredientInfo = await ingredientsNutionalValue.json()
      const newIngredientInfo:any = {}
 
      // creating a object to hold info to add to the state management ingredientListToTrackMacros obj
      newIngredientInfo[newIngredient.trim()] = {
        fats: ingredientInfo[0].fat_total_g,
        carbs: ingredientInfo[0].carbohydrates_total_g,
        protein: ingredientInfo[0].protein_g,
        calories: ingredientInfo[0].calories
      }

      // adding to the macros
      setFats(fats + ingredientInfo[0].fat_total_g)
      setCarbs(carbs + ingredientInfo[0].carbohydrates_total_g)
      setProtein(protein + ingredientInfo[0].protein_g)
      setCalories(calories + ingredientInfo[0].calories)

      // adding the obj created eariler in function to state
      setIngredientListToTrackMacros({
        ...ingredientListToTrackMacros,
        ...newIngredientInfo
       })
    }
    const perServingMacros:PerServingMacros ={
        fats:Math.ceil(fats/servings),
        carbs:Math.ceil(carbs/servings),
        protein:Math.ceil(protein/servings),
        calories:Math.ceil(calories/servings),
    }
    const postRecipe = function(e:React.SyntheticEvent){
        e.preventDefault()
        setIsPending(true);
        const newRecipe:recipe= {
            timeOfPost:new Date().toISOString(),
            userId: userId,
            pictureOfFood:convertedImage,
            ingridentList:Object.keys(ingredientListToTrackMacros),
            levelOfMeal: recipeSkill,
            prepTime: recipeTime,
            likes:[""],
            bookmarks:[""],
            title:recipeName,
            steps:steps,
            // added the macros to send to the backend
            fats:Math.ceil(fats),
            carbs:Math.ceil(carbs),
            protein:Math.ceil(protein),
            calories:Math.ceil(calories),
            servings:servings,
            perServingMacros: perServingMacros
        }
        console.log(newRecipe)

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
            return response.json()
        })
        .then((data)=>{
            setData(data)
            console.log("Success!",data)
            setIsPending(false);
            window.location.reload()
        })
        .catch((err)=>{
            console.log("Failed",err.message)
        })
            
    }
    const enterPress = function(event:KeyboardEventHandler<HTMLInputElement>){
        if(event.key === 'Enter'){
            ingredientClickHandle()
        }     
    }

    useEffect(()=>{
        isPending ? setPostButtonText('Posting') : setPostButtonText('Post Recipe')
    },[isPending])

    return ( 
        <div className={className}>
            <div className={className2}>

            <div className="top-left">
                {convertedImage && <img src={convertedImage}  />}

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
                    <input onKeyDown={enterPress} id="ing" value={newIngredient} className="ingredient" onChange={((e)=>setNewIngredient(e.target.value))} placeholder="2 onions.." type="text" />
                    <button className="ingredient-btn" onClick={(e)=>ingredientClickHandle(e)}>Add Ingredient</button>
                    {/* <button onClick={(e)=>ingredientClickHandle(e)} type="submit" form="ing" className="ingredient-btn">Add Ingredient</button> */}
                </div>
                
                <div className="img-upload-box">
                    <input className="img-upload" accept="*" onChange={handleImageUpload} type="file" />
                </div>
            </div>

            </div>
            <div className={className3}>

                <div className="ingredients">
                    <ul className="ingredients-list">
                        {Object.keys(ingredientListToTrackMacros).map((ingredient,index)=>(
                            
                            <button onClick={(e)=>removeIngredientFromList(index)} key={index} className="ingredient-button">{ingredient}</button>
                                                                              
                        ))}
                    </ul>
                </div>

            <textarea onChange={(e)=>setSteps(e.target.value)} className="recipe-steps" placeholder={`1. Peel veggies ${"\n"}2. Boil water${"\n"}...`} name="" id=""></textarea>     
            <button onClick={(e)=>postRecipe(e)} className="post-recipe-btn">{postButtonText}</button>    
            </div>  
            
        </div>
     );
}
 
export default CreateRecipe;