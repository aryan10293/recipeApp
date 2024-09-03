import { useLocation } from "react-router-dom";
import DifficultyIcon from "../../assets/DifficultyIcon";
import Navbar from "../../assets/Navbar";
import RecipeCard from "../../assets/RecipeCard";
import TimeButton from "../../assets/TimeButton";
import { useEffect,useState } from "react";
import CommentList from "../../components/CommentList";
import useFetch from "../../assets/useFetch";
import CommentBox from "../../components/CommentBox";
import CommentButton from "../../assets/CommentButton";

interface RecipeCardProps{
    recipeName:string,
    recipeImage:string,
    recipeTime:number,
    ingridientList:string[],
    steps:string,
    timeOfPost:string,
    likes:string[],
    recipeClass:string,
    _id:string
}

interface Comments{
    timeOfPost:string,
    commentorId: string,
    postId: string,
    likes:string[],
    comment: String,

}




const SingleCard:React.FC<RecipeCardProps> = () => {

    const location = useLocation()
    const {recipe} = location.state || {};

    // if(!recipe){
    //     return <p>Recipe is not found bitch</p>
    // }
    useEffect(()=>{
        console.log("recipe: ",recipe.post[0]);
        
    },[recipe])

    const {data:datas} = useFetch(`http://localhost:2030/getcommentsfrompost/${recipe.post[0]._id}`)
    const [commentsVisbile,setCommentsVisible] = useState<boolean>(false)
    const [commentClassName,setCommentClassName] = useState<string>("invisible")
    const [commentClassName2,setCommentClassName2] = useState<string>("invisible")
    const [commentClassName3,setCommentClassName3] = useState<string>("invisible")
    const [commentClassName4,setCommentClassName4] = useState<string>("invisible")
    

    const handleComments = function(e:React.MouseEvent){
        e.stopPropagation()
        commentsVisbile ? setCommentsVisible(false):setCommentsVisible(true)

        if(commentsVisbile === false){
            setCommentClassName("comment-container")
            setCommentClassName2("new-comment-container")
            setCommentClassName3("comments-container")
            setCommentClassName4('a')
        }
        else{
            setCommentClassName("comment-container-invisible")
            setCommentClassName2("new-comment-container-invisible")
            setCommentClassName3("comments-container-invisible")
            setCommentClassName4('a-invisible')
        }


    }     

    const renderUserComments = function(){
       return datas.comments.map((comment:Comments,index:number)=>(
         <CommentList 
         key={index}
         classs={commentClassName} 
         classs2={commentClassName2} 
         classs3={commentClassName3}  
         likes={comment.likes} 
         timeOfPost={comment.timeOfPost} 
         comment={comment.comment}
         
         />
        ))
    }
    
    return ( 
        
        <div className="single-card-box">
            <Navbar/>

            {recipe && 
            <RecipeCard  
            levelOfMeal={recipe.post[0].levelOfMeal}
            likes={recipe.post[0].likes.length}
            steps={recipe.post[0].steps} 
            timeOfPost={""} 
            _id={recipe.post[0]._id}
            recipeClass="single-card" 
            recipeName={recipe.post[0].nameOfDish} 
            recipeTime={recipe.post[0].prepTime} 
            ingridientList={recipe.post[0].ingridentList} 
            recipeImage={recipe.post[0].image}/>
            }
            {recipe &&
            recipe.post[0] &&
            <CommentBox postId={recipe.post[0]._id} classs4={commentClassName4} classs2={commentClassName2} />}
        </div>
     );
}
 
export default SingleCard;