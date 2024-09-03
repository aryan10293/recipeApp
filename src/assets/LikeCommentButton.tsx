import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import CommentList from '../components/CommentList';

interface LikeCommentButtonProps{
    commentId:string,
    postIndex:number,
    postId:string,
    likeLength:number
}   

const LikeCommentButton:React.FC<LikeCommentButtonProps> = ({likeLength,commentId,postIndex,postId}) => {

    const style = {
        backgroundColor:'transparent',
        border:'none',
        zIndex:'10'
    }

    const [commeIsLiked,setCommentIsLiked] = useState<boolean>(false)
    const [likeNum,setLikeNum] = useState<number>(likeLength)


    const addLikeToComment = async function(e:React.MouseEvent){
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
            likeNumber() 
            setCommentIsLiked(false)
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

    useEffect(()=>{
        likeNumber
        console.log('comment is liked:',commeIsLiked)
    },[])

    const clickHandle =  async function (e:React.MouseEvent){
        if(commeIsLiked===false){
           await addLikeToComment(e)
            
        }
        else{
           await unlikeComment(e)
            
        }
    }

    return ( 
        <div className="comment-like-button">
            <button onClick={(e)=>{clickHandle(e)}} style={style}><FontAwesomeIcon icon={faHeart} /></button>
            {likeNum && <p>{likeNum}</p>}
        </div>
     );
}
 
export default LikeCommentButton;