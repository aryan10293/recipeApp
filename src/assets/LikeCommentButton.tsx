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
}   
interface Comments{
    _id:string
}

const LikeCommentButton:React.FC<LikeCommentButtonProps> = ({likeLength,commentId,postIndex,postId}) => {

    const style = {
        backgroundColor:'transparent',
        border:'none',
        zIndex:'10'
    }

    const [commeIsLiked,setCommentIsLiked] = useState<boolean>(false)
    const [likeNum,setLikeNum] = useState<number>(likeLength)
    const [userID,setUserID] = useState<string>()

    const getUsersId = async function(){
        try {
            const token =  await localStorage.getItem("token")
            const user = await fetch(`http://localhost:2030/getuser/${token}`)
            const userData = await user.json()
            const fetchedUserID = await userData.userinfo[0]._id
            setUserID(fetchedUserID)   
            return fetchedUserID
            
        } catch (error) {
            console.log('Could not get userId for comment posting',error)
        }
    }

    const isCommentLiked = async function(){
        try {
            const userId = await getUsersId()

            const response = await fetch(`http://localhost:2030/getcommentsfrompost/${postId}`)
            const postComments = await response.json()
            // console.log(postComments)
            const comment = await postComments.comments.find(c=>c._id === commentId)
            
            if(comment && comment.likes.includes(userID)){
                setCommentIsLiked(true)
            }
            setLikeNum(comment.likes.length)

        } catch (error) {
            console.log(error)
        }
    }

    const addLikeToComment = async function(e:React.MouseEvent){
        try {
            e.stopPropagation()
            await isCommentLiked()
            const token = localStorage.getItem('token')
            if(!token){
                throw new Error('Token not found')
            }

            const response = await fetch(`http://localhost:2030/getuser/${token}`)
            if(!response.ok){
                throw new Error('Failed to fetch user data')
            }

            const userData = await response.json()
            const currentUserID = userData.userinfo[0]._id
            if(!currentUserID){
                throw new Error('User ID is not found in response')
            }

            const payload = {
                userId: currentUserID
            }

            if(typeof commentId === 'undefined'){
                throw new Error('postId is undefined')
            }
            
            console.log('userId: ',payload.userId,'commentId: ',commentId)
            const response2 = await fetch(`http://localhost:2030/addliketocomment/${commentId}`,
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
            console.log('comment is liked:',commeIsLiked)

        } catch (error) {
            console.error(error)
        }              
    }

    const unlikeComment = async function(e:React.MouseEvent){
        try {
            e.stopPropagation()
            const token = localStorage.getItem('token')
            if(!token){
                throw new Error('Token not found')
            }

            const response = await fetch(`http://localhost:2030/getuser/${token}`)
            if(!response.ok){
                throw new Error('Failed to fetch user data')
            }

            const userData = await response.json()
            const currentUserID = userData.userinfo[0]._id
            if(!currentUserID){
                throw new Error('User ID is not found in response')
            }

            const payload = {
                userId: currentUserID
            }

            if(typeof commentId === 'undefined'){
                throw new Error('postId is undefined')
            }
            
            console.log('userId: ',payload.userId,'commentId: ',commentId)
            const response2 = await fetch(`http://localhost:2030/unlikecomment/${commentId}`,
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
            console.log('Comment like is withdrawn'); 
            setCommentIsLiked(false)
            likeNumber() 
            console.log('comment is liked:',commeIsLiked)
            
        } catch (error) {
            console.error(error)
        }           
    }

    const likeNumber = async function(){
        try {
            const response = await fetch(`http://localhost:2030/getcommentsfrompost/${postId}`)
            const comment = await response.json()
            const likes = comment.comments[postIndex].likes.length

            setLikeNum(likes)
            console.log('comment is liked:',commeIsLiked)
            
        } catch (error) {
            console.log(error)
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
            <button  onClick={(e)=>{clickHandle(e)}} style={style}><FontAwesomeIcon icon={faHeart} /></button>
            {likeNum && <p>{likeNum}</p>}
        </div>
     );
}
 
export default LikeCommentButton;