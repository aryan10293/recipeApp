import React from 'react'
import { useState, useEffect } from 'react'
function AdvancedSearch(this: any) {
    const [maxCal, setMaxCal] = useState<number | undefined>(undefined)
    const [maxCarb, setMaxCarb] = useState<number | undefined>(undefined)
    const [maxPro, setMaxPro] = useState<number | undefined>(undefined)
    const [maxFat, setMaxFat] = useState<number | undefined>(undefined)
    const [prep, setPrep] = useState<number | undefined>(undefined)
    const [ingridents, setIngridents] = useState<string[]>([])
    const [ingridentsEx, setIngridentsEx] = useState<string[]>([])
    
    interface SearchData{
       maxCal:undefined | number, 
       maxCarb:undefined | number, 
       maxPro:undefined | number, 
       maxFat:undefined | number, 
    }
    const searchData:SearchData= {
        maxCal: maxCal, 
        maxCarb: maxCarb, 
        maxPro: maxPro, 
        maxFat: maxFat, 

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
                        <input type="text" />
                        <button>add to search</button>
                    </div>
               </div>

               <div>
                    <h2>ingredients excluded</h2>
                    <div>
                        <label style={{color:'black'}} htmlFor="">ingredients</label>
                        <input type="text" />
                        <button>add to search</button>
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
