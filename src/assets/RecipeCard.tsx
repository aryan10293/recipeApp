
import React, { MouseEventHandler, useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import DeleteButton from "./DeleteButton"
import TimeButton from "./TimeButton";
import useFetch from "./useFetch";
import { Link, useNavigate } from "react-router-dom";
import DifficultyIcon from "./DifficultyIcon";

import { icon } from "@fortawesome/fontawesome-svg-core";
import CommentBox from "../components/CommentBox";
import CommentButton from "./CommentButton";
import CommentList from "../components/CommentList";
import Login from "../pages/AuthLayout/Login";
import LikeCommentButton from "./LikeCommentButton";
import UserNameButton from "../components/UsernameButton";
import UserNameProfileButton from "../components/UserNameProfileButton";
import FollowUserButton from "../components/FollowUserButton";
import NutritionCard from "../components/NutritionCard";






interface RecipeCardProps{
    recipeName:string,
    recipeImage:string,
    recipeTime:number,
    ingridientList:string[],
    steps?:string,
    timeOfPost?:string,
    likes?:string[],
    recipeClass:string,
    _id:string,
    levelOfMeal:number,
    postIndex?:number
    userID?:string | undefined,
    userWhoPostId:string,
    // showNutrition:(e:React.MouseEvent<HTMLButtonElement>)=>void;
}

interface Comments{
    timeOfPost:string,
    commentorId: string,
    postId: string,
    likes:string[],
    comment: String,
    _id:string,


}

interface CommentsArray{
    array:Comments[]
}

const RecipeCard:React.FC<RecipeCardProps> = ({postIndex,_id,recipeClass,recipeName,recipeTime,ingridientList,steps,recipeImage,likes,levelOfMeal,userID,userWhoPostId}) => {

        const [url,setUrl] = useState<string>("")
        const {data:recipe} = useFetch(url)
        const navigate = useNavigate()

        const handleClick = async function(){

            setUrl(`http://localhost:2030/getpost/${_id}`)
            
        }

        useEffect(()=>{
            if(recipe){
                navigate("/recipe",{state:{recipe}})
                // console.log(recipe)
            }
        },[recipe,recipe])

        const iconStyle = {
            margin:'0px',
            backgroundColor:'transparent',
            border:'none',
            color:'#f8f5f2'
        }

        //Meal difficulty Icon rendering
        const renderDifficultyIcon = function(){
            let icons:JSX.Element[] = []
            for(var i:number = 0;i<levelOfMeal;i++){
                icons.push(<DifficultyIcon style={iconStyle} key={i}/>)
            }
            return icons
        }
          
        // Comment section
        const {data:datas} = useFetch(`http://localhost:2030/getcommentsfrompost/${_id}`)
        const [commentsVisbile,setCommentsVisible] = useState<boolean>(false)
        const [commentClassName,setCommentClassName] = useState<string>("invisible")
        const [commentClassName2,setCommentClassName2] = useState<string>("invisible")
        const [commentClassName3,setCommentClassName3] = useState<string>("invisible")
        const [commentClassName4,setCommentClassName4] = useState<string>("invisible")
        const [comments, setComments] = useState<Comments[] | null>([]);
        const [commentNum,setCommentNum] = useState<number | null>(null)

        const fetchComments = async():Promise<any> => {
            try {   
                    const comms = await fetch(`http://localhost:2030/getcommentsfrompost/${_id}`)
                    const comms2 = await comms.json()
                    const commentses = comms2.comments
                    setCommentNum(commentses.length)
                    setComments(commentses);
            } catch (error) {
                console.log(error)
            }
          };
        
          useEffect(()=>{
                fetchComments()
          },[])

    //       useEffect(()=>{
    //         fetchComments()
    //   },[_id])


        const handleCommentVisibility = function(e:React.MouseEvent){
            e.stopPropagation()
            commentsVisbile ? setCommentsVisible(false):setCommentsVisible(true)

            if(commentsVisbile === false){
                fetchComments()
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
                renderAllUserComments()
            }    
        }     

        const handleCommentButtonClick =  function (e:React.MouseEvent){
            e.stopPropagation()
            handleCommentVisibility(e)
        }

        const handleNewComment = async () => {
            try {
                await fetchComments()
                
            } catch (error) {
                console.log(error)
            }
        };

          const renderAllUserComments = function(){
            console.log('Comments are rendered')
            return comments?.map((comment:Comments,index:number)=>(
                
              <CommentList 
              key={comment._id}
              classs={commentClassName} 
              classs2={commentClassName2} 
              classs3={commentClassName3}  
              likes={comment.likes} 
              timeOfPost={comment.timeOfPost} 
              comment={comment.comment}
              commentorId={comment.commentorId}
              postId={_id}
              commentId={comment._id}
              postIndex={index}
              userID={userID}
               />
             ))
         }

         const deletePost= async function(e:React.MouseEvent){
            try {
                e.stopPropagation()
                const response = await fetch(`http://localhost:2030/deletepost/${_id}`,{
                    method:"DELETE",
                    headers:{
                        "Content-Type":"application/json"
                    },
                })
                if(!response){
                    throw new Error('Failed to fetch delete API. Response is not ok')
                }
                const data = await response.json()
                if(!data){
                    throw new Error('Failed to fetch delete API. Response data is not ok')
                }
                console.log(data);
            } catch (error) {
                console.log(error);
                
            }

         }

         const [showNutritions,setShowNutritions] = useState<boolean>(false)

         const handleCardFace = (e:MouseEvent)=>{
            e.stopPropagation()
             showNutritions ? setShowNutritions(false) : setShowNutritions(true)
         }

//          const printRecipeCard = function(){
//             return (
//                 <div className="recipe-card-container">
//                     <button onClick={handleClick} className={recipeClass}>

//                     <div className="left-side">
//                         <div className="left-top">
//                             {recipeImage && <img src={recipeImage}/>}
//                         </div>
//                     </div>

//             <div className="right-side">
//                 <div className="right-top">
//                     <div className="top-box">
//                         <h2 className="recipe-title">{recipeName}</h2>
//                         <TimeButton/>
//                         {recipeTime &&  <h3 className="recipe-time">{recipeTime}</h3>}
//                         <div className="recipe-skill-box">
//                          {comments && renderDifficultyIcon()}
//                         </div>

//                     </div>
//                     <div className="recipe-ingredients">
//                         <ul>
//                             {ingridientList && ingridientList.map((ingredient,index)=>(
//                                 <li key={index}>{ingredient}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="right-bottom">
//                     <h2 className="recipe-steps">{steps}</h2>
                        
//                 <div className="interaction-box">
//                     {userID && <LikeButton userId={userID} postId={_id} postLikes={likes?}/> }
//                     {comments && <CommentButton numberOfComments={commentNum} margin="0 0 0 15px" handle={(e)=>handleCommentButtonClick(e)}/>}
//                     <BookmarkButton userId={userID} postId={_id}/>
//                     <div className="name-n-follow-box">
//                         {<UserNameProfileButton className="username-btn" postsId={_id}/>}
//                         <FollowUserButton followClass="card-follow-btn" personToFollow={userWhoPostId}/>
//                     </div>
//                     {/* <button onClick={(e)=>deletePost(e)}>Delete</button> */}
//                     <button onClick={(e)=>handleCardFace(e)}>Back side</button>
//                 </div>
                
//                 </div>
//             </div>
//     </button>
//     {datas && <CommentBox handleNewComment={handleNewComment} postId={_id} classs4={commentClassName4} classs2={commentClassName2} userId={userID}/>}
//     {commentsVisbile && renderAllUserComments()}
// </div> )}

const printRecipeCard = function(){
    return (
        <div className="recipe-card-container">
            <button onClick={handleClick} className={recipeClass}>
                <div className="left-side">
                    <div className="left-top">
                        {recipeImage && <img src={recipeImage}/>}
                    </div>
                </div>

                <div className="right-side">
                    <div className="right-top">
                        <div className="top-box">
                            <h2 className="recipe-title">{recipeName}</h2>
                            <TimeButton/>
                            {recipeTime &&  <h3 className="recipe-time">{recipeTime}</h3>}
                            <div className="recipe-skill-box">
                                {comments && renderDifficultyIcon()}
                            </div>
                        </div>
                        <div className="recipe-ingredients">
                            <ul>
                                {ingridientList && ingridientList.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="right-bottom">
                        <h2 className="recipe-steps">{steps}</h2>
                        
                        <div className="interaction-box">
                            {userID && <LikeButton userId={userID} postId={_id} postLikes={likes}/>}
                            {comments && <CommentButton numberOfComments={commentNum} margin="0 0 0 15px" handle={(e) => handleCommentButtonClick(e)}/>}
                            <BookmarkButton userId={userID} postId={_id}/>
                            <div className="name-n-follow-box">
                                <UserNameProfileButton className="username-btn" postsId={_id}/>
                                <FollowUserButton followClass="card-follow-btn" personToFollow={userWhoPostId}/>
                            </div>
                            {/* <button onClick={(e)=>deletePost(e)}>Delete</button> */}
                            <button onClick={(e) => handleCardFace(e)}>Back side</button>
                        </div>
                    </div>
                </div>
            </button>
            {datas && <CommentBox handleNewComment={handleNewComment} postId={_id} classs4={commentClassName4} classs2={commentClassName2} userId={userID}/>}
            {commentsVisbile && renderAllUserComments()}
        </div>
    )
}


     const printNutritions = function(){
        return(
            <button onClick={(e)=>handleCardFace(e)}>Front Side</button>
        )
     }
         
         

    return ( 
 
        showNutritions ? <NutritionCard handle={(e:MouseEvent)=>handleCardFace(e)}/> : printRecipeCard()
    
     );
}
 


export default RecipeCard;
