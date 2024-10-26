import { useContext, useEffect, useState } from "react";
import useFetch from "./useFetch";
import RecipeCard from "./RecipeCard";
import UserContext from "../contexts/UserContext";
import useGetUserDataFromId from "../Utils/useGetUserDataFromId";
import NutritionCard from "../components/NutritionCard";

interface RecipeListProps{
    url:string,
    userId:string | null,
    recipeNumber:number,
    showAllPosts:boolean
}

const RecipeList:React.FC<RecipeListProps> = ({url,recipeNumber,userId,showAllPosts}) => {

    interface Recipe{
        timeOfPost:string,
        nameOfDish:string,
        _id:string
        prepTime:number,
        image:string,
        ingridentList:string[],
        likes:string[],
        levelOfMeal:number,
        steps?:string,
        postIndex:number,
        userWhoPostId:string,
        calories:string,
        fats:string,
        protein:string,
        carbs:string
    }

    interface Followings{
        userId: string
    }

    const userID = useContext(UserContext)
    const {userFollowingNum:followings} = useGetUserDataFromId(userID)

    const {data:recipes} = useFetch(url)

    useEffect(()=>{
        if(recipes){
            if(showAllPosts){
                setArray()
            }
            else{
                setFollowedArray() 
            }
        }
     
    },[recipes,showAllPosts])

    useEffect(()=>{
        setFollowedArray()
        
    },[showAllPosts,recipeNumber])
 
    //Creating user's followed users recipe array
    const [renderedFollowedArray,setRenderedFollowedArray] = useState<Recipe[]>()

    const setFollowedArray = async function() {
        try {
            let array: Recipe[] = recipes?.post || [];
            console.log('Followings:', followings);
        
            const arr = array.filter((recipe: Recipe) => {
                const id:string = recipe.userWhoPostId
                const isFollowed = followings?.includes(id); 
                console.log('Is Followed:', isFollowed);
                return isFollowed;
            });
    
            if(arr){
                console.log(arr.length);
                console.log(recipeNumber);
                
                if(arr?.length-recipeNumber<=0){
                    let array:Recipe[] = arr.slice(0,arr?.length)
                    setRenderedFollowedArray(array)
                }
                else{
                    let array:Recipe[] = arr?.slice(arr?.length-recipeNumber,arr?.length)
                    console.log(array);
                    
                    setRenderedFollowedArray(array)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    // Setting the first recipes' array to be rendered
    const [renderedArray,setRenderedArray] = useState<Recipe[]>()

    const setArray = async function(){
        try {
            if(recipes?.post){
                const recipesLength = await recipes?.post.length
            if(recipesLength - recipeNumber<=0){
                let array:Recipe[] = await recipes?.post.slice(0,recipesLength)
                setRenderedArray(array)
            }
            else{
                let array:Recipe[] = await recipes?.post.slice(recipesLength-recipeNumber,recipesLength)
                setRenderedArray(array)
            }  
            }  
        } catch (error) {
            console.log(error)
        }
      }

      useEffect(()=>{
        setArray()
      },[recipeNumber])

    const renderAllPosts = function():JSX.Element{
            return(
                    <div> 
                        {
                        userID &&
                        renderedArray && 
                        renderedArray.length > 0 && 
                        renderedArray
                            .slice()
                            .reverse()
                            .map((recipe:Recipe,index:number)=>(
                                <div  className="asd" key={recipe._id}>
                                    {<RecipeCard
                                    _id={recipe._id}
                                    recipeName={recipe.nameOfDish}
                                    recipeTime={recipe.prepTime}
                                    recipeImage={recipe.image}                  
                                    ingridientList={recipe.ingridentList}
                                    likes={recipe.likes}
                                    timeOfPost={recipe.timeOfPost}
                                    recipeClass="recipe-card"
                                    levelOfMeal={recipe.levelOfMeal}
                                    postIndex={index}
                                    userID={userID} 
                                    userWhoPostId={recipe.userWhoPostId}     
                                    calories={recipe.calories}
                                    fats={recipe.fats}
                                    carbs={recipe.carbs}
                                    protein={recipe.protein}        
                                    /> 
                                    }


                                </div>))
                        }
                    </div>
                )
        }


    const renderFollowedPosts = function():JSX.Element{
            return(
                    <div>
                        {
                        userID &&
                        renderedFollowedArray && 
                        renderedFollowedArray.length > 0 && 
                        renderedFollowedArray
                            .slice()
                            .reverse()
                            .map((recipe:Recipe,index:number)=>(
                                <div  className="asd" key={recipe._id}>
                                    {<RecipeCard 
                                    _id={recipe._id}
                                    recipeName={recipe.nameOfDish}
                                    recipeTime={recipe.prepTime}
                                    recipeImage={recipe.image}                  
                                    ingridientList={recipe.ingridentList}
                                    likes={recipe.likes}
                                    timeOfPost={recipe.timeOfPost}
                                    recipeClass="recipe-card"
                                    levelOfMeal={recipe.levelOfMeal}
                                    postIndex={index}
                                    userID={userID} 
                                    userWhoPostId={recipe.userWhoPostId}
                                    calories={recipe.calories}
                                    fats={recipe.fats}
                                    carbs={recipe.carbs}
                                    protein={recipe.protein}           
                                    />}
                                </div>))
                        }
                    </div>
                )
        }

        const decider = function(){
            if(showAllPosts){
               return  renderedArray ? renderAllPosts() : <p>Loading...</p>
            }
            else{
               return renderedFollowedArray ? renderFollowedPosts() : <p>Loading...</p>
            }
        }

    return ( 
        decider()
     );
}
 
export default RecipeList;