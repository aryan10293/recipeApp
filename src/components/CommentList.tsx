import React, { useEffect, useState } from "react";
import LikeButton from "../assets/LikeButton";
import LikeCommentButton from "../assets/LikeCommentButton";
import UserNameProfileButton from "./UserNameProfileButton";

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

    const formatTime = function(){
        const timeCode =  parseInt(timeOfPost)
        const date = new Date(timeCode)
        const cut = date.toLocaleString().split('A')[0]
        return cut
    }

    return ( 
        <div className={classs}>

            <div className={classs3}>
                <UserNameProfileButton className="comment-username" commentorId={commentorId}  postsId={postId}/>
                <h4 className="comment-content">{comment && comment}</h4>

                <div className="comment-interactions">
                <LikeCommentButton userId={userID} likeLength={likes.length} postIndex={postIndex} commentId={commentId} postId={postId}/>
                <h4 className="comment-time">{formatTime()}</h4>  

                </div>

                
            </div>
        </div>
     );
}
 
export default CommentList;