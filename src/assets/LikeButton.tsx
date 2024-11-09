import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDisplay, faHeart } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

interface PostLikeButtonProps{
    postId: string,
    userId:string
    postLikes:string[] | number | undefined
}

const LikeButton:React.FC<PostLikeButtonProps> = ({postId,userId,postLikes}) => {


    const style = {
        backgroundColor:'transparent',
        border:'none',
        zIndex:'10',
        color:'#BF3131',
        
        
    }
    const style2 = {
        backgroundColor:'transparent',
        border:'none',
        zIndex:'10',
        color:'#f8f5f2'
    }


    const [likeNum,setLikeNum] = useState<number>()
    const [postIsLiked,setPostIsLiked] = useState<boolean>()
      
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

    const getCurrentLikes = async function():Promise<string[] | undefined>{
        try {
            if(!postId){
                throw new Error('Post ID is not found while getting current like array')
            }
            
            const response = await fetch(`http://localhost:2030/getpost/${postId}`)
            if(!response.ok){
                throw new Error('No response while fetching like array')
            }

            const post = await response.json()
            const likes:string[] = post.post[0].likes
            
            return likes
            
        } catch (error) {
            console.log(error)
        }
    }

    const likePost = async function(e:React.MouseEvent){
        try {

            e.stopPropagation()
            if(!userId){
                throw new Error('current user id is not present')
            }

            const addLikeToPostBody = {
                userId:userId,
            }

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
            setPostIsLiked(true)
            likeNumber()
        } catch (error) {
            console.log('Failed!',error)
        }
        
    }

    const unLikePost = async function(e:React.MouseEvent){
        try {
            e.stopPropagation()
            if(!userId){
                throw new Error('current user id is not present')
            }

            const unlikePostBody = {
                userId:userId,
            }

            const response = await fetch(`http://localhost:2030/unlikepost/${postId}`,
                {
                    method:'PUT',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(unlikePostBody)
                }
            )
            
            if(!response.ok){
                throw new Error('Issue with liking post')
            }

            const data = await response.json()

            console.log('Success!',data)
            setPostIsLiked(false)
            likeNumber()
        } catch (error) {
            console.log('Failed!',error)
        }
    }

    const isPostLiked = function(e:React.MouseEvent,likes:string[]|undefined){

        e.stopPropagation()
        
        const liked = likes?.includes(userId)

        return liked;
    }
    
    const clickHandle = async function(e:React.MouseEvent){
        e.stopPropagation()
        const likeArray:string[]|undefined = await getCurrentLikes()
        const liked:boolean | undefined = isPostLiked(e,likeArray)
        
        if(!liked){
            likePost(e)
            likeNumber()   
            setPostIsLiked(false)
        }
        else{
            unLikePost(e)
            likeNumber() 
            setPostIsLiked(true)
        }
    }

    const checkIfPostIsLiked = async () => {
        try {
            const response = await fetch(`http://localhost:2030/getpost/${postId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post data');
            }
            const post = await response.json();
            const likes: string[] = post.post[0].likes;

            // Check if the current user's ID is in the list of likes
            setPostIsLiked(likes.includes(userId));
        } catch (error) {
            console.log('Error checking if post is liked:', error);
        }
    };
    useEffect(()=>{
        likeNumber()  
        checkIfPostIsLiked()
    },[])

    return ( 
        <div style={{display:'flex',flexDirection:'row'}} className="like-button">
            {postLikes && <button onClick={(e)=>{clickHandle(e)}} className='mr-1' style={postIsLiked ? style:style2}><FontAwesomeIcon icon={faHeart} /></button>}
            <p>{likeNum}</p>         
        </div>
     );
}
 
export default LikeButton;
