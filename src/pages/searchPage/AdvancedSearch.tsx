import React from 'react'
import { useState, useEffect } from 'react'
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
        // i want to a automatic calulations for this if all 3 other macros are preset
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
        const sendSearch = await fetch('http://localhost:2030/advancedmealsearch', {
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(searchData)
        })
        const jsonSendSearch = await sendSearch.json()
        console.log(jsonSendSearch)
    }
  return (
    <div className='rounded-md w-[1000px] flex flex-col items-center bg-[#078080] mt-5 p-5 shadow-[5px_10px_10px_rgba(0,0,0,0.2)]'>
            <form className='w-[750px]' onSubmit={handleSearch}>
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
                
               <div className='flex flex-col h-[80px] justify-around mb-8'>
                    <h2 className='capitalize text-center mb-6 text-xl'>ingredients included</h2>
                    <div className='w-3/5 flex flex-row'>
                        <label className='mr-4 w-[90px] capitalize text-black' htmlFor="">ingredients</label>
                        <input className='p-1 mr-4 w-[200px] bg-white rounded-md' type="text" value={ingredientText} onChange={(e:any) => setIngredientText(e.target.value)}/>
                        <button className='p-1 btn' onClick={(e) => addOrExcludeIngredient(e,ingredients,ingredientText.toLowerCase(),setIngredients, ingredientsEx, 'include', setIngredientsEx )}>Add to search</button>
                    </div>
               </div>

               <div className='flex flex-col h-[80px] justify-around'>
                    <h2 className='capitalize text-center mb-6 text-xl'>ingredients excluded</h2>
                    <div className='w-2/3 flex flex-row'>
                        <label className='mr-4 w-[90px] capitalize text-black' htmlFor="">ingredients</label>
                        <input className='p-1 mr-4 w-[200px] bg-white rounded-md' type="text"  value={ingredientTextEx} onChange={(e:any) => setIngredientTextEx(e.target.value)}/>
                        <button className='p-1 btn' onClick={(e) => addOrExcludeIngredient(e, ingredientsEx, ingredientTextEx.toLowerCase(), setIngredientsEx, ingredients, 'exclude', setIngredients)}>Exclude From Search</button>
                    </div>
               </div>

               <div className='flex flex-col h-[60px] justify-around'>
                    <div className='w-5/12 flex flex-row'>
                        <label className='mr-4 w-[90px] capitalize text-black' htmlFor="">prep time</label>
                        <input className='p-1 w-[200px] bg-white rounded-md' value={prep} onChange={(e:any) => setPrep(e.target.value)} type="number" />
                    </div>
               </div>
                <button className='p-1 btn text-center'>Search</button>
            </form>
            <div>
                <h1>return search stuff</h1>
                {
                    returnedData.map((x:any) => {
                       return  <h4>lol</h4>
                    })
                }
            </div>
      </div>
  )
}

export default AdvancedSearch
