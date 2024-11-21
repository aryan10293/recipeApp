import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../assets/Navbar";
import RecipeCard from "../../assets/RecipeCard";
import { useEffect,useId,useState } from "react";
import CommentList from "../../components/CommentList";
import useFetch from "../../assets/useFetch";
import CommentBox from "../../components/CommentBox";
import useUserId from "../../Utils/useGetUserId";

interface RecipeCardProps{
    recipeName?:string,
    recipeImage?:string,
    recipeTime?:number,
    ingridientList?:string[],
    steps?:string,
    timeOfPost?:string,
    likes?:string[],
    recipeClass?:string,
    _id?:string
    // showFollow:boolean
}

interface Comments{
    timeOfPost:string,
    commentorId: string,
    postId: string,
    likes:string[],
    comment: string,
    _id:string
}




const SingleCard:React.FC<RecipeCardProps> = (showFollow) => {



    const location = useLocation()
    const {recipe} = location.state || {};
    const navigate = useNavigate()

    useEffect(()=>{
        console.log("recipe: ",recipe.post[0].likes.length);
        
    },[recipe])

    const {data:datas} = useFetch(`https://recipeapp-22ha.onrender.com/getcommentsfrompost/${recipe.post[0]._id}`)
    const {userUsername:userName,userProfilePicture:profilePicture,userId:userID} = useUserId()
    const [commentsVisbile,setCommentsVisible] = useState<boolean>(false)
    const [commentClassName,setCommentClassName] = useState<string>("invisible")
    const [commentClassName2,setCommentClassName2] = useState<string>("invisible")
    const [commentClassName3,setCommentClassName3] = useState<string>("invisible")
    const [commentClassName4,setCommentClassName4] = useState<string>("invisible")
    
    // Checking if token is present
    const isThereToken = localStorage.getItem('token')
    useEffect(()=>{
      if(!isThereToken){
          navigate('/')
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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

    const renderAllUserComments = function(){
        console.log(datas)
        return datas.map((comment:Comments,index:number)=>(
            
          <CommentList 
          key={comment._id}
          classs={commentClassName} 
          classs2={commentClassName2} 
          classs3={commentClassName3}  
          likes={comment.likes} 
          timeOfPost={comment.timeOfPost} 
          comment={comment.comment}
          commentorId={comment.commentorId}
          postId={comment._id}
          commentId={datas.comments[index]._id}
          postIndex={index} 
          userID={recipe.post[0]._id}
           />
         ))
     }
    useEffect(()=>{
        console.log(recipe.likes);
    },)
    useEffect(()=>{
        console.log(recipe.post[0].perServingMacros, 'loasjhbviu');
        
    },[recipe.post[0]._id])
    return ( 
        
        <div className="single-card-box">
            {<Navbar userName={userName} userProfilePicture={profilePicture}/>}

            {
            recipe &&
            datas &&
            userID && 
            <RecipeCard  
            showFollow={true}
            levelOfMeal={recipe.post[0].levelOfMeal}
            likes={recipe.post[0].likes}
            steps={recipe.post[0].steps} 
            timeOfPost={""} 
            _id={recipe.post[0]._id}
            recipeClass="single-card" 
            recipeName={recipe.post[0].nameOfDish} 
            recipeTime={recipe.post[0].prepTime} 
            ingridientList={recipe.post[0].ingridentList} 
            recipeImage={recipe.post[0].image}
            userID={userID || undefined}
            userWhoPostId={recipe.post[0].userWhoPostId}
            calories={recipe.post[0].perServingMacros.calories || 0}
            fats={recipe.post[0].perServingMacros.fats || 0}
            protein={recipe.post[0].perServingMacros.protein  || 0}
            carbs={recipe.post[0].perServingMacros.carbs ||  0 }
            />
            }

            {
            recipe &&  
            <CommentBox postId={recipe.post[0]._id} classs4={commentClassName4} classs2={commentClassName2} userId={userID} handleNewComment={function (): void {
                    throw new Error("Function not implemented.");
                } }/>}
        </div>
     );
}
 
export default SingleCard;