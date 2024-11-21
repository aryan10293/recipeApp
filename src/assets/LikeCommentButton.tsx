import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpFromWaterPump, faHeart } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import CommentList from '../components/CommentList';
import Comment from '../pages/commentPage/Comment';

interface LikeCommentButtonProps{
    commentId:string,
    postIndex:number,
    postId:string,
    likeLength:number
    userId:string | undefined
}   
interface Comments{
    _id:string
}

const LikeCommentButton:React.FC<LikeCommentButtonProps> = ({likeLength,commentId,postIndex,postId,userId}) => {

    const style = {
        backgroundColor:'transparent',
        border:'none',
        zIndex:'10',
        color:'white',
    }
    const style2 = {
        backgroundColor:'transparent',
        border:'none',
        zIndex:'10',
        color:'red',
    }
    const [commeIsLiked,setCommentIsLiked] = useState<boolean>(false)
    const [likeNum,setLikeNum] = useState<number>(likeLength)

    const isCommentLiked = async function(){
        try {
            const response = await fetch(`https://recipeapp-22ha.onrender.com/getcommentsfrompost/${postId}`)
            const postComments = await response.json()

            const comment = await postComments.comments.find((c:Comments)=>c._id === commentId)
            
            if(comment && comment.likes.includes(userId)){
                setCommentIsLiked(true)
            }
            setLikeNum(comment.likes.length)

        } catch (error) {
            // console.log(error)
        }
    }

    const addLikeToComment = async function(e:React.MouseEvent){
        try {
            e.stopPropagation()
 
            const payload = {
                userId: userId
            }

            if(typeof commentId === 'undefined'){
                throw new Error('postId is undefined')
            }
            
            // console.log('userId: ',payload.userId,'commentId: ',commentId)
            const response2 = await fetch(`https://recipeapp-22ha.onrender.com/addliketocomment/${commentId}`,
                {
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(payload)
                }
            )
            if(!response2.ok){
                throw Error('Problem with adding like to comment')
            }
            setCommentIsLiked(true)
            likeNumber()
            // console.log('comment is liked:',commeIsLiked)

        } catch (error) {
            // console.error(error)
        }              
    }

    const unlikeComment = async function(e:React.MouseEvent){
        try {
            e.stopPropagation()
 
            const payload = {
                userId: userId
            }

            if(typeof commentId === 'undefined'){
                throw new Error('postId is undefined')
            }
            
            // console.log('userId: ',payload.userId,'commentId: ',commentId)
            const response2 = await fetch(`https://recipeapp-22ha.onrender.com/unlikecomment/${commentId}`,
                {
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(payload)
                }
            )
            if(!response2.ok){
                throw Error('Problem with deducting like from comment')
            }
            // console.log('Comment like is withdrawn'); 
            setCommentIsLiked(false)
            likeNumber() 
            // console.log('comment is liked:',commeIsLiked)
            
        } catch (error) {
            // console.error(error)
        }           
    }

    const likeNumber = async function(){
        try {
            const response = await fetch(`https://recipeapp-22ha.onrender.com/getcommentsfrompost/${postId}`)
            const comment = await response.json()
            const likes = comment.comments[postIndex].likes.length

            setLikeNum(likes)
            // console.log('comment is liked:',commeIsLiked)
            
        } catch (error) {
            // console.log(error)
        }
    }

    useEffect (()=>{
        isCommentLiked()
    },)

    const clickHandle = async function (e:React.MouseEvent){
        e.stopPropagation()
        await isCommentLiked()
        if(!commeIsLiked){
           await addLikeToComment(e)
            
        }
        else{
           await unlikeComment(e)
        }
    }

    return ( 
        <div className="comment-like-button">
            <button  onClick={(e)=>{clickHandle(e)}} style={commeIsLiked ? style2:style}><FontAwesomeIcon icon={faHeart} /></button>
            {<p className='comment-like-number'>{likeNum}</p>}
        </div>
     );
}
 
export default LikeCommentButton;