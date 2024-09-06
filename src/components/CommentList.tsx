import React, { useEffect, useState } from "react";
import LikeButton from "../assets/LikeButton";
import LikeCommentButton from "../assets/LikeCommentButton";

interface CommentsProps{
    timeOfPost:string,
    commentorId: string | undefined
    postId: string,
    likes:string[],
    comment: String,
    classs:string,
    classs2:string,
    classs3:string,
    commentId:string,
    postIndex:number,
    userID:string | undefined
}

const hrStyle = {
    width:'800px',
    border:'1px solid #f8f5f2',
    outline:'none',
    
}

const CommentList:React.FC<CommentsProps> = ({
    comment,
    classs,
    classs2,
    classs3,
    likes,
    timeOfPost,
    commentorId,
    commentId,
    postIndex,
    postId,
    userID
}) => {

    const [currentUserName,setCurrentUserName] = useState<string>("")

    const getUserById = async function(id:string){
        try {
            const response = await fetch(`http://localhost:2030/getuserbyid/${id}`)
            const user = await response.json()
            if(!response.ok){
                throw new Error('Response is not okay. Could not fetch user.')
            }
            const userName = await user.user[0].userName
           
            if(!userName){
                throw new Error('userName could not be destructed')
            }
            // console.log('Username is: ',userName)

            setCurrentUserName(userName)
        } catch (error) {
            console.log('Error while fetching the user/username',error)
        }
    }

    useEffect(()=>{
        if(commentorId){
            getUserById(commentorId)
            
        }
    },[commentorId])

    const formatTime = function(){
        const timeCode =  parseInt(timeOfPost)
        const date = new Date(timeCode)
        const cut = date.toLocaleString().split('A')[0]
        return cut
    }

    return ( 
        <div className={classs}>

            <div className={classs3}>
                <h4 className="comment-username">{commentorId && currentUserName}</h4>    
                <h4 className="comment-content">{comment && comment}</h4>

                <div className="comment-interactions">
                <LikeCommentButton userId={userID} likeLength={likes.length} postIndex={postIndex} commentId={commentId} postId={postId}/>
                {/* <h4 className="comment-like-number">{likes.length}</h4> */}
                <h4 className="comment-time">{formatTime()}</h4>  

                </div>

                
            </div>
        </div>
     );
}
 
export default CommentList;