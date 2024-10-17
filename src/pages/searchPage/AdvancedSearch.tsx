import React from 'react'
import { useState, useEffect } from 'react'
function AdvancedSearch(this: any) {
    const [maxCal, setMaxCal] = useState<number | undefined>(undefined)
    const [maxCarb, setMaxCarb] = useState<number | undefined>(undefined)
    const [maxPro, setMaxPro] = useState<number | undefined>(undefined)
    const [maxFat, setMaxFat] = useState<number | undefined>(undefined)
    const [prep, setPrep] = useState<number>(0)
    const [ingredients, setIngredients] = useState<string[]>([])
    const [ingredientText, setIngredientText] = useState<string>('')
    const [ingredientTextEx, setIngredientTextEx] = useState<string>('')
    const [ingredientsEx, setIngredientsEx] = useState<string[]>([])
    const [returnedData, setreturnedData] = useState<any[]>([])
    interface SearchData{
        maxCal:undefined | number, 
        maxCarb:undefined | number, 
        maxPro:undefined | number, 
        maxFat:undefined | number, 
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
        Number(e.target.value) === 0 ? setMaxCal(undefined) : setMaxCal(Number(e.target.value))
    }
    const handlePro = (e:any) => { 
        Number(e.target.value) === 0 ? setMaxPro(undefined) : setMaxPro(Number(e.target.value))
    }
    const handleFat = (e:any) => { 
        Number(e.target.value) === 0 ? setMaxFat(undefined) : setMaxFat(Number(e.target.value))
    }
    const handleCarb = (e:any) => { 
        Number(e.target.value) === 0 ? setMaxCarb(undefined) : setMaxCarb(Number(e.target.value))
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
    <div style={{marginTop:'50px'}}>
            <form onSubmit={handleSearch}>
                <div>
                    <h1>per servings</h1>
                    <div>
                        <label style={{color:'black'}} htmlFor="">max protein</label>
                        <input type="text" onChange={handlePro} />
                    </div>
                    <div>
                        <label  style={{color:'black'}}htmlFor="">max carbs</label>
                        <input type="text" onChange={handleCarb} />
                    </div>
                    <div>
                        <label style={{color:'black'}} htmlFor="">max fats</label>
                        <input type="text"onChange={handleFat} />
                    </div>
                    <div>
                        <label style={{color:'black'}}  htmlFor="">max calories</label>
                        <input type="number" onChange={handleCal} />
                    </div>
                </div>
                
               <div>
                    <h2>ingredients included</h2>
                    <div>
                        <label style={{color:'black'}} htmlFor="">ingredients</label>
                        <input type="text" value={ingredientText} onChange={(e:any) => setIngredientText(e.target.value)}/>
                        <button onClick={(e) => addOrExcludeIngredient(e,ingredients,ingredientText.toLowerCase(),setIngredients, ingredientsEx, 'include', setIngredientsEx )}>add to search</button>
                    </div>
               </div>

               <div>
                    <h2>ingredients excluded</h2>
                    <div>
                        <label style={{color:'black'}} htmlFor="">ingredients</label>
                        <input type="text"  value={ingredientTextEx} onChange={(e:any) => setIngredientTextEx(e.target.value)}/>
                        <button onClick={(e) => addOrExcludeIngredient(e, ingredientsEx, ingredientTextEx.toLowerCase(), setIngredientsEx, ingredients, 'exclude', setIngredients)}>Exclude From Search</button>
                    </div>
               </div>

               <div>
                    <div>
                        <label style={{color:'black'}} htmlFor="">prep time</label>
                        <input value={prep} onChange={(e:any) => setPrep(e.target.value)} type="number" />
                    </div>
               </div>
                <button>Search</button>
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
