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
    levelOfMeal:number
}

interface Comments{
    timeOfPost:String,
    commentorId: string,
    postId: string,
    likes:string[],
    comment: String,
}

interface CommentsArray{
    array:Comments[]
}
const RecipeCard:React.FC<RecipeCardProps> = ({_id,recipeClass,recipeName,recipeTime,ingridientList,steps,recipeImage,timeOfPost,likes,levelOfMeal}) => {
        const [userId, setUserId] = useState<string>('')
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
        useEffect(() => {
            const getUser = async() => {
                const checkUser = await fetch(`http://localhost:2030/getuser/${localStorage.getItem('token')}`, {
                    method:'GET',
                    headers: {'Content-Type': 'application/json'}
                })
                const userData = await checkUser.json()
                setUserId(userData.userinfo[0]._id)
            }
            getUser()
        }, [])
        const iconStyle = {
            margin:'0px',
            backgroundColor:'transparent',
            border:'none'
        }

        const renderIcon = function(){
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

        // useEffect(()=>{
        //     console.log("commentsVisbile:",commentsVisbile);
            
        // },[commentsVisbile])

        const renderUserComments = function(){
           return datas.comments.map((comment:Comments,index:number)=>(
             <CommentList 
             key={index}
             classs={commentClassName} 
             classs2={commentClassName2} 
             classs3={commentClassName3}  
             likes={comment.likes} 
             timeOfPost={comment.timeOfPost} 
             comment={comment.comment} />
            ))
        
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
                         {renderIcon()}
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
                    <LikeButton postId={_id}/> 
                    {/* <p>{likes.length}</p> */}
                    <BookmarkButton />
                    <CommentButton margin="0 0 0 15px" handle={(e)=>handleComments(e)}/>
                </div>
                </div>
            </div>
    </button>
    {<CommentBox postId={_id} classs4={commentClassName4} classs2={commentClassName2} />}
        {
        datas &&
        datas.comments&&
        datas.comments[0]&&
        renderUserComments()
        // <CommentBox timeOfPost={datas.comments[0].timeOfPost} likes={datas.comments[0].likes} classs={commentClassName} classs2={commentClassName2} classs3={commentClassName3} comment={datas.comments[0].comment}/>
        }
</div>
    
     );
}
 


export default RecipeCard;