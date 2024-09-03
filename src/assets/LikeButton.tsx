import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDisplay, faHeart } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

interface PostLikeButtonProps{
    postId: string,
}

const LikeButton:React.FC<PostLikeButtonProps> = ({postId}) => {

    const style = {
        backgroundColor:'transparent',
        border:'none',
        zIndex:'10',
        color:'#f8f5f2'
    }

    
    const [likeNum,setLikeNum] = useState<number>()
    const [postIsLiked,setPostIsLiked] = useState<boolean>(false)
    
    
    
    const likeNumber = async function(){
        try {
            const response = await fetch(`http://localhost:2030/getpost/${postId}`)
            const post = await response.json()
            const likes = post.post[0].likes.length
            
            setLikeNum(likes)
            
        } catch (error) {
            console.log(error)
        }
    }

    const [userID,setUserID] = useState<string>("")

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

    const likePost = async function(e:React.MouseEvent){
        try {
            e.stopPropagation()
            const currentUserID = await getUsersId()
            if(!currentUserID){
                throw new Error('current user id is not present')
            }

            const addLikeToPostBody = {
                userId:currentUserID,
            }

            // console.log('User ID :',currentUserID );
            // console.log('Payload to like comment: ',addLikeToPostBody);
            // console.log('Post ID:',postId)

            const response = await fetch(`http://localhost:2030/addliketopost/${postId}`,
                {
                    method:'PUT',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(addLikeToPostBody)
                }
            )
            
            if(!response.ok){
                throw new Error('Issue with liking post')
            }

            const data = await response.json()
            console.log('Success!',data)
            likeNumber()
            setPostIsLiked(true)
        } catch (error) {
            console.log('Failed!',error)
        }
        
    }

    const unLikePost = async function(e:React.MouseEvent){
        try {
            e.stopPropagation()
            const currentUserID = await getUsersId()
            if(!currentUserID){
                throw new Error('current user id is not present')
            }

            const addLikeToPostBody = {
                userId:currentUserID,
            }

            const response = await fetch(`http://localhost:2030/unlikepost/${postId}`,
                {
                    method:'PUT',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(addLikeToPostBody)
                }
            )
            
            if(!response.ok){
                throw new Error('Issue with liking post')
            }

            const data = await response.json()

            console.log('Success!',data)
            likeNumber()
            setPostIsLiked(false)
        } catch (error) {
            console.log('Failed!',error)
        }
    }

    const clickHandle = async function(e:React.MouseEvent){
        if(postIsLiked===false){
            likePost(e)
        }
        else{
            unLikePost(e)
        }
    }

    useEffect(()=>{
        likeNumber()
    },[])

    return ( 
        <div style={{display:'flex',flexDirection:'row'}} className="like-button">
            <button onClick={(e)=>{clickHandle(e)}}  style={style}><FontAwesomeIcon icon={faHeart} /></button>
            <p>{likeNum}</p>         
        </div>
     );
}
 
export default LikeButton;
