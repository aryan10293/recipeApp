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
    const [newIngredient,setNewIngredient] = useState<string>("")

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
            console.log("Adding ingredient: " + newIngredient)
            setIngredients([...ingredients,newIngredient])
            setNewIngredient("")
        }   
    }

    const removeIngredientFromList = function(index:number){    
        setIngredients(ingredients.filter((ingredient,i)=>{
            return i !== index
        }))    
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
    }

    const handleImageUpload = async function(){
        if(e.target.files && e.target.files.length !== 0){
            const file = e.target.files[0]
            setUploadedImage(file)
            const base64Image = await base64_encode(file)
            setconvertedImage(base64Image)
        }
    }
    const base64_encode = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const postRecipe = function(e:React.SyntheticEvent){
        e.preventDefault()
        setIsPending(true);
        const newRecipe:recipe= {
            timeOfPost:new Date().toISOString(),
            userId: userId,
            pictureOfFood:convertedImage,
            ingridentList:ingredients,
            levelOfMeal: recipeSkill,
            prepTime: recipeTime,
            likes:[""],
            bookmarks:[""],
            title:recipeName,
            steps:steps,
            
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
                        {ingredients.map((ingredient,index)=>(
                            
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