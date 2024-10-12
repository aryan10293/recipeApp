import React from 'react'
import { useState, useEffect } from 'react'
function AdvancedSearch(this: any) {
    const [maxCal, setMaxCal] = useState<number | undefined>(undefined)
    const [maxCarb, setMaxCarb] = useState<number | undefined>(undefined)
    const [maxPro, setMaxPro] = useState<number | undefined>(undefined)
    const [maxFat, setMaxFat] = useState<number | undefined>(undefined)
    const [prep, setPrep] = useState<number | undefined>(undefined)
    const [ingredients, setIngredients] = useState<string[]>([])
    const [ingredientText, setIngredientText] = useState<string>('')
    const [ingredientTextEx, setIngredientTextEx] = useState<string>('')
    const [ingredientsEx, setIngredientsEx] = useState<string[]>([])
    
    interface SearchData{
        maxCal:undefined | number, 
        maxCarb:undefined | number, 
        maxPro:undefined | number, 
        maxFat:undefined | number, 
        ingredients: string[],
        ingredientsEx: string[],
        
    }
    const searchData:SearchData= {
        maxCal: maxCal, 
        maxCarb: maxCarb, 
        maxPro: maxPro, 
        maxFat: maxFat, 
        ingredients:ingredients,
        ingredientsEx: ingredientsEx

    }
    const handleCal = (e:any) => { 
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
    
    function addOrExcludeIngredient(e:any, ingredientsExOrIn: string[], ingredientText: string, setIngredientsExOrIn: React.Dispatch<React.SetStateAction<any[]>>, checkIfInExOrIncludeList:string[], action:string){
        e.preventDefault()
        // checking to see if user was trying to include soemthing they excluded in a search or vic versa
        if(checkIfInExOrIncludeList.includes(ingredientText)){
            let pastAction: undefined | string = undefined
            action === 'include' ? pastAction = 'exclude' : pastAction = 'include'
            let confirmStatement = `You've already added ${ingredientText} to your ${pastAction} list! do you want now ${action} it?`
            confirm(confirmStatement) ? null : null
            if(confirm(confirmStatement)){
                // i have to add parameter for to delete the text from an array
                // i should have everything i need to then add it to the next array
            } else {
                return
            }
        }

        const updatedIngredients = [...ingredientsExOrIn, ingredientText];
        setIngredientsExOrIn([...new Set(updatedIngredients)]);
    }
    console.log(ingredients, ingredientsEx)
    useEffect(() => {
        console.log(maxCal)
        console.log(searchData)
    },[maxCal, maxFat, maxCarb, maxPro])
  return (
    <div style={{marginTop:'50px'}}>
            <form action="">
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
                        <input type="text" onChange={(e:any) => setIngredientText(e.target.value)}/>
                        <button onClick={(e) => addOrExcludeIngredient(e,ingredients,ingredientText,setIngredients, ingredientsEx, 'include' )}>add to search</button>
                    </div>
               </div>

               <div>
                    <h2>ingredients excluded</h2>
                    <div>
                        <label style={{color:'black'}} htmlFor="">ingredients</label>
                        <input type="text"  onChange={(e:any) => setIngredientTextEx(e.target.value)}/>
                        <button onClick={(e) => addOrExcludeIngredient(e, ingredientsEx, ingredientTextEx, setIngredientsEx, ingredients, 'exclude')}>Exclude From Search</button>
                    </div>
               </div>

               <div>
                    <div>
                        <label style={{color:'black'}} htmlFor="">prep time</label>
                        <input type="text" />
                    </div>
               </div>
                <button>Search</button>
            </form>
      </div>
  )
}

export default AdvancedSearch
