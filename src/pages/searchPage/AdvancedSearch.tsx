import React from 'react'
import { useState, useEffect } from 'react'
import {motion} from 'framer-motion'
import RecipeCard from '../../assets/RecipeCard'

function AdvancedSearch(this: any) {
    const [maxCal, setMaxCal] = useState<number | boolean>(false)
    const [maxCarb, setMaxCarb] = useState<number | boolean>(false)
    const [maxPro, setMaxPro] = useState<number | boolean>(false)
    const [maxFat, setMaxFat] = useState<number | boolean>(false)
    const [prep, setPrep] = useState<number>(0)
    const [ingredients, setIngredients] = useState<string[]>([])
    const [ingredientText, setIngredientText] = useState<string>('')
    const [ingredientTextEx, setIngredientTextEx] = useState<string>('')
    const [ingredientsEx, setIngredientsEx] = useState<string[]>([])
    const [returnedData, setreturnedData] = useState<any[]>([])
    interface SearchData{
        maxCal:boolean | number, 
        maxCarb:boolean | number, 
        maxPro:boolean | number, 
        maxFat:boolean | number, 
        ingredients: string[],
        ingredientsEx: string[],
        prep:number
        
    }
    const searchData:SearchData= {
        maxCal: maxCal, 
        maxCarb: maxCarb, 
        maxPro: maxPro, 
        maxFat: maxFat, 
        ingredients:ingredients,
        ingredientsEx: ingredientsEx,
        prep:prep

    }
    const handleCal = (e:any) => { 
        Number(e.target.value) === 0 ? setMaxCal(false) : setMaxCal(Number(e.target.value))
    }
    const handlePro = (e:any) => { 
        Number(e.target.value) === 0 ? setMaxPro(false) : setMaxPro(Number(e.target.value))
    }
    const handleFat = (e:any) => { 
        Number(e.target.value) === 0 ? setMaxFat(false) : setMaxFat(Number(e.target.value))
    }
    const handleCarb = (e:any) => { 
        Number(e.target.value) === 0 ? setMaxCarb(false) : setMaxCarb(Number(e.target.value))
    }
    
    function addOrExcludeIngredient(e:any, ingredientsExOrIn: string[], ingredientText: string, setIngredientsExOrIn: React.Dispatch<React.SetStateAction<any[]>>, checkIfInExOrIncludeList:string[], action:string, filterIngrediant: React.Dispatch<React.SetStateAction<any[]>>){
        e.preventDefault()
        setIngredientText('')
        setIngredientTextEx('')
        let pastAction: undefined | string = undefined
        // checking to see if user was trying to include soemthing they excluded in a search or vic versa
        if(checkIfInExOrIncludeList.includes(ingredientText)){
            action === 'include' ? pastAction = 'exclude' : pastAction = 'include'
            const confirmStatement = `You've already added ${ingredientText} to your ${pastAction} list! do you want to ${action} it?`
            if(confirm(confirmStatement)){
                const removeFromlist = ingredientsExOrIn.filter((x:string) => x !== ingredientText)
                filterIngrediant(removeFromlist)
            } else {
                return
            }
        }

        const updatedIngredients = [...ingredientsExOrIn, ingredientText];
        setIngredientsExOrIn([...new Set(updatedIngredients)]);
    }
    const handleSearch = async (e:any) => {
        e.preventDefault()
        const sendSearch = await fetch('https://recipeapp-22ha.onrender.com/advancedmealsearch', {
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(searchData)
        })
        const jsonSendSearch = await sendSearch.json()
        // console.log(jsonSendSearch)
        setreturnedData(jsonSendSearch.meals)
    }
 

  return (
    <motion.div 
    initial={{opacity:0,rotateX:90}}
    animate={{opacity:1,rotateX:0}}
    transition={{duration:0.3,delay:0.3}}
    className='w-[1000px] flex flex-col items-center'>
            <form className='w-[1000px] bg-[#078080] m-[25px] p-5 shadow-[5px_10px_10px_rgba(0,0,0,0.2)] rounded-md flex flex-col items-center'  onSubmit={handleSearch}>
                <div className='flex flex-col h-[190px] justify-between mb-8'>
                    <h1 className='capitalize text-center mb-1 text-2xl font-medium'>search per servings</h1>
                    <hr className='w-[750px] rounded-3xl outline-none border-black mb-5' />
                    <div className='mb-1 w-[350px] flex flex-row'>
                        <label className='mr-4 w-[90px] capitalize text-black' htmlFor="">max protein</label>
                        <input className='p-1 w-[200px] bg-white rounded-md focus:border-none focus:rounded-md focus:outline focus:outline-1' type="text" onChange={handlePro} />
                    </div>
                    <div className='mb-1 w-[350px] flex flex-row'>
                        <label className='mr-4 w-[90px] capitalize text-black'htmlFor="">max carbs</label>
                        <input className='p-1 w-[200px] bg-white rounded-md focus:border-none focus:rounded-md focus:outline focus:outline-1' type="text" onChange={handleCarb} />
                    </div>
                    <div className='mb-1 w-[350px] flex flex-row'>
                        <label className='mr-4 w-[90px] capitalize text-black' htmlFor="">max fats</label>
                        <input className='p-1 w-[200px] bg-white rounded-md focus:border-none focus:rounded-md focus:outline focus:outline-1' type="text"onChange={handleFat} />
                    </div>
                    <div className='mb-1 w-[350px] flex flex-row'>
                        <label className='mr-4 w-[90px] capitalize text-black'  htmlFor="">max calories</label>
                        <input className='p-1 w-[200px] bg-white rounded-md focus:border-none focus:rounded-md focus:outline focus:outline-1' type="number" onChange={handleCal} />
                    </div>
                </div>
                
               <div className='flex flex-col h-[80px] justify-between mb-8 w-[750px] flex-start'>
                    <h2 className='capitalize text-center mb-6 text-xl'>ingredients included</h2>
                    <div className='flex flex-row'>
                        <label className='mr-4 w-[90px] capitalize text-black' htmlFor="">ingredients</label>
                        <input className='p-1 mr-4 w-[200px] bg-white rounded-md' type="text" value={ingredientText} onChange={(e:any) => setIngredientText(e.target.value)}/>
                        <button className='p-1 btn translate-x-[18px]' onClick={(e) => addOrExcludeIngredient(e,ingredients,ingredientText.toLowerCase(),setIngredients, ingredientsEx, 'include', setIngredientsEx )}>Include</button>
                    </div>
               </div>

               <div className='flex flex-col h-[80px] w-[750px] justify-around'>
                    <h2 className='capitalize text-center mb-6 text-xl'>ingredients excluded</h2>
                    <div className='w-2/3 flex flex-row'>
                        <label className='mr-4 w-[90px] capitalize text-black' htmlFor="">ingredients</label>
                        <input className='p-1 mr-4 w-[200px] bg-white rounded-md' type="text"  value={ingredientTextEx} onChange={(e:any) => setIngredientTextEx(e.target.value)}/>
                        <button className='p-1 btn translate-x-[18px]' onClick={(e) => addOrExcludeIngredient(e, ingredientsEx, ingredientTextEx.toLowerCase(), setIngredientsEx, ingredients, 'exclude', setIngredients)}>Exclude </button>
                    </div>
               </div>

               <div className='flex flex-col h-[60px] justify-around w-[750px]'>
                    <div className='w-5/12 flex flex-row'>
                        <label className='mr-4 w-[90px] capitalize text-black' htmlFor="">prep time</label>
                        <input className='p-1 w-[200px] bg-white rounded-md' value={prep} onChange={(e:any) => setPrep(e.target.value)} type="number" />
                    </div>
               </div>
                <button className='p-1 btn text-center'>Search</button>
            </form>
            <div className='flex flex-col items-center'>
                <h1 className='text-2xl'>Results</h1>
                {
                    returnedData.map((result:any) => {
                       return <RecipeCard showFollow={false} likes={result.likes} userID={result.userWhoPostId} _id={result._id} recipeName={result.nameOfDish} recipeImage={result.image} recipeTime={result.prepTime} ingridientList={result.ingredientList} levelOfMeal={result.levelOfMeal} userWhoPostId={result.userWhoPostId} calories={result.calories} fats={result.fats} carbs={result.carbs} protein={result.protein} recipeClass='recipe-card'/>
                    })
                }
            </div>
      </motion.div>
  )
}

export default AdvancedSearch
