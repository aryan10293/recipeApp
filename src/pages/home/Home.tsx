import React from 'react'
import { json } from 'react-router-dom';

const Home: React.FC = () => {
    console.log('lol')
    const [userId, setUserId] = React.useState<string>('')
    const [ingridentList, setIngridentList] = React.useState<string[]>([])
    const [levelOfMeal, setLevelOfMeal] = React.useState<string>('')
    const [title, setTitle] = React.useState<string>('')
    const [prepTime, setPrepTime] = React.useState<number>()
    // finsih making create recipe api
    // finish creating comment api
    // create get user stuff api
    // create get comment and get recipe feed
    interface CreateRecipeInfo{
      title:string,
      userId:string,
      ingridentList: string[],
      levelOfMeal: string,
      prepTime: number,
    }
    const createRecipeInfo: CreateRecipeInfo = {
      userId:userId,
      title:title,
      ingridentList: ingridentList,
      levelOfMeal: levelOfMeal,
      prepTime: prepTime || 0
    }
    const handleSumbit = async (e:React.FormEvent<HTMLElement>) => {
      const postRecipe = await fetch('http://localhost:2020/createrecipe', {
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(createRecipeInfo),
      })

      const recipeData = await postRecipe.json()
      console.log(createRecipeInfo)
    }
  return (
    <div>
      <form onSubmit={handleSumbit}>
        <div>
            <label htmlFor="nameOfMEal">Name of Meal</label>
            <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} type="text" />
        </div>
        <div>
            <label htmlFor="nameOfMEal">ingrident list</label>
            <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setLevelOfMeal(e.target.value)} type="text" />
        </div>
        <button type='submit'>postRecipe</button>
      </form>
    </div>
  );
};


export default Home

 // const newRecipe = {
        //     userId: req,
        //     image:{type: String, required: true},
        //     ingridentList:{type: String, required: true},
        //     levelOfMeal: {type: String, required: true},
        //     prepTime: {type:  Number, required: true},
        // }