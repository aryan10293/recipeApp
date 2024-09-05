import React, { useEffect, useState } from "react";
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





interface RecipeCardProps{
    recipeName:string,
    recipeImage:string,
    recipeTime:number,
    ingridientList:string[],
    steps?:string,
    timeOfPost:string,
    likes:string[],
    recipeClass:string,
    _id:string,
    levelOfMeal:number,
    postIndex:number
    userID:string | undefined
}

interface Comments{
    timeOfPost:string,
    commentorId: string,
    postId: string,
    likes:string[],
    comment: String,
    _id:string,
    postIndex:number
}

interface CommentsArray{
    array:Comments[]
}

const RecipeCard:React.FC<RecipeCardProps> = ({postIndex,_id,recipeClass,recipeName,recipeTime,ingridientList,steps,recipeImage,likes,levelOfMeal,userID}) => {

        const [url,setUrl] = useState<string>("")
        const {data:recipe} = useFetch(url)
        const navigate = useNavigate()

        const handleClick = async function(){

            setUrl(`http://localhost:2030/getpost/${_id}`)
            
        }

        useEffect(()=>{
            if(recipe){
                navigate("/recipe",{state:{recipe}})
                console.log(recipe)
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
        const [comments, setComments] = useState<Comments[]>([]);
        const [commentNum,setCommentNum] = useState<number>()
        const [likeNums,setLikeNums] = useState<number>();
        
        const fetchComments = async():Promise<any> => {
            try {
                const data = await datas
                const commentNum = data.comments.length
                const commentComments = data.comments
                setComments(commentComments);
                setCommentNum(commentNum)
            } catch (error) {
                console.log(error)
            }
          };
        
          useEffect(()=>{
                fetchComments()
          },)


        const handleCommentVisibility = function(e:React.MouseEvent){
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
                renderAllUserComments()
            }
            
        }     

        const handleCommentButtonClick =  function (e:React.MouseEvent){
            e.stopPropagation()
            // renderAllUserComments()
            handleCommentVisibility(e)
            // renderAllUserComments()
        }

        const handleNewComment = async () => {
            fetchComments();
            renderAllUserComments()
          };

          const renderAllUserComments = function(){
            console.log(comments)
            return comments.map((comment:Comments,index:number)=>(
                
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
              commentId={datas.comments[index]._id}
              postIndex={index}
               />
             ))
         }

    return ( 
 


<div className="recipe-card-container">
    <button onClick={handleClick} className={recipeClass}>
            <div className="left-side">

                <div className="left-top">
                    <img src={recipeImage}/>
                </div>

            </div>
            <div className="right-side">

                <div className="right-top">
                    <div className="top-box">
                        <h2 className="recipe-title">{recipeName}</h2>
                        <TimeButton/>
                        <h3 className="recipe-time">{recipeTime}</h3>
                        <div className="recipe-skill-box">
                         {renderDifficultyIcon()}
                        </div>

                    </div>
                    <div className="recipe-ingredients">
                        <ul>
                            {ingridientList.map((ingredient,index)=>(
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="right-bottom">
                    <h2 className="recipe-steps">{steps}</h2>
                        
                <div className="interaction-box">
                    {userID && <LikeButton userId={userID} postId={_id} postLikes={likes}/> }
                    {comments && <CommentButton numberOfComments={commentNum} margin="0 0 0 15px" handle={(e)=>handleCommentButtonClick(e)}/>}
                    {/* <BookmarkButton postId={_id}/> */}
                </div>
                </div>
            </div>
    </button>
    {datas && <CommentBox handleNewComment={handleNewComment} postId={_id} classs4={commentClassName4} classs2={commentClassName2} userId={userID}/>}
    {commentsVisbile && renderAllUserComments()}
</div>
    
     );
}
 


export default RecipeCard;