import React from 'react'
import { json } from 'react-router-dom';

const Home: React.FC = () => {
    const [userId, setUserId] = React.useState<string>('')
    const [ingridentList, setIngridentList] = React.useState<string[]>([])
    const [levelOfMeal, setLevelOfMeal] = React.useState<string>('')
    const [title, setTitle] = React.useState<string>('')
    const [prepTime, setPrepTime] = React.useState<number>()

    React.useEffect(() => {
        const getUser = async() => {
            const checkUser = await fetch(`http://localhost:2020/getuser/${localStorage.getItem('token')}`, {
                method:'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const userData = await checkUser.json()
            setUserId(userData.userinfo[0]._id)
        }
        getUser()
    }, [])
    interface CreateRecipeInfo{
      title:string,
      userId:string,
      ingridentList: string[],
      levelOfMeal: string,
      prepTime: number,
      pictureOfFood: any
    }
    const createRecipeInfo: CreateRecipeInfo = {
      userId:userId,
      title:title,
      ingridentList: ingridentList,
      levelOfMeal: levelOfMeal,
      prepTime: prepTime || 0,
      pictureOfFood: ''
    }
    const handleSumbit = async (e:any) => {
      e.preventDefault()
      //getting image form input element and setting it in the pobject ot send to the backemd
      let img = e.target.childNodes[3].childNodes[1].files[0]
      img = await convertBase64(img)
      createRecipeInfo.pictureOfFood = img
      //getting image form input element and setting it in the pobject ot send to the backemd
      const postRecipe = await fetch('http://localhost:2020/createrecipe', {
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(createRecipeInfo),
      })
      console.log(createRecipeInfo, 1)
      const recipeData = await postRecipe.json()
    }
    const addIngrident = (e:any) => {
      let ingrident:string = e.target.parentElement.childNodes[1].value
      setIngridentList([...ingridentList, ingrident])
      e.target.parentElement.childNodes[1].value = ''
      // this to add onto this later
      // display ingridents added
      // delete indridents added by accident 
      // edit typos 
      // add measurings 
    }

    // adds images, sends to backend and uploads to cloudinary
    const convertBase64 = (file: any) => {
      return new Promise(async (resolve, reject) => {
        try {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.onload = () => {
            resolve(fileReader.result);
          };

          fileReader.onerror = (error) => {
            reject(error);
          };
        } catch (error) {
          reject(error);
        }
      });
    };
  return (
    <div>
      <form onSubmit={handleSumbit}>
        <div>
            <label htmlFor="nameOfMEal">Name of Meal</label>
            <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} type="text" />
        </div>
        <div>
            <label htmlFor="nameOfMEal">Cooking Diffculty</label>
            <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setLevelOfMeal(e.target.value)} type="text" />
        </div>
        <div>
            <label htmlFor="nameOfMEal">ingrident list</label>
            <input type="text" />
            <p onClick={addIngrident}>Add Ingrident</p>
        </div>
        <div>
            <label htmlFor="nameOfMEal">Add Picture Of Food</label>
            <input type="file" />
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