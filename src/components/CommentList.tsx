import React from "react";
import LikeButton from "../assets/LikeButton";

interface CommentsProps{
    timeOfPost:String,
    commentorId?: string,
    postId?: string,
    likes:string[],
    comment: String,
    classs:string,
    classs2:string,
    classs3:string
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
    commentorId
}) => {
    return ( 
        <div className={classs}>

            <div className={classs3}>
                <h4 className="comment-username">Username</h4>    
                <h4 className="comment-content">{comment}</h4>

                <div className="comment-interactions">
                    <h4 className="comment-time">{timeOfPost}</h4>  
                    {/* <LikeButton/> */}
                    <h4 className="comment-like-number">{likes.length}</h4>
                </div>

                
            </div>
        </div>
     );
}
 
export default CommentList;