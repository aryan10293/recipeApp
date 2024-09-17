import { useContext, useEffect, useState } from "react";
import useFetch from "./useFetch";
import RecipeCard from "./RecipeCard";
import UserContext from "../contexts/UserContext";
import useGetUserDataFromId from "../Utils/useGetUserDataFromId";

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
        userWhoPostId:string 
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
        
    },[showAllPosts])


    
    //Creating user's followed users recipe array
    const [renderedFollowedArray,setRenderedFollowedArray] = useState<Recipe[]>()

    const setFollowedArray = function() {
        let array: Recipe[] = recipes?.post || [];
        console.log('Followings:', followings);
    
        const arr = array.filter((recipe: Recipe) => {
            const isFollowed = followings?.includes(recipe.userWhoPostId); // Directly check if the recipe user ID is in the followings array
            console.log('Is Followed:', isFollowed);
            return isFollowed;
        });

        if(arr){
            const arrLength = arr.length
            if(arr.length-arrLength<=0){
                let array:Recipe[] = arr.slice(0,arrLength)
                setRenderedFollowedArray(array)
            }
            else{
                let array:Recipe[] = arr.slice(arrLength-recipeNumber,arrLength)
                setRenderedFollowedArray(array)
            }
        }
        const arrNumbered = arr.slice()
    
        ;
    }
    

    // Setting the first recipes' array to be rendered
    const [renderedArray,setRenderedArray] = useState<Recipe[]>()

    const setArray = async function(){
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
                                    />}
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
                                    />}
                                </div>))
                        }
                    </div>
                )
        }


    return ( 
        showAllPosts ? renderAllPosts() : renderFollowedPosts()
     );
}
 
export default RecipeList;