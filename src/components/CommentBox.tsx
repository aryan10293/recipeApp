import LikeButton from "../assets/LikeButton";

interface CommentsProps{
    timeOfPost?:String,
    commentorId?: string,
    postId?: string,
    likes?:string[],
    comment: String,
    classs:string
}

const hrStyle = {
    width:'1000px',
    border:'1px solid white',
    outline:'none'
}

const CommentBox:React.FC<CommentsProps> = ({comment,classs}) => {
    return ( 
        <div className={classs}>
            <div className="new-comment-container">
                <textarea className="new-comment-input" placeholder="Your comment..." name="" id=""></textarea>
                <button className="send-comment-btn">Send</button>
            </div>
                <hr style={hrStyle}/>
            <div className="comments-container">
                <h4 className="comment-username">Username</h4>    
                <h4 className="comment-content">{comment}</h4>

                <div className="comment-interactions">
                    <h4 className="comment-time">Time of post</h4>  
                    <LikeButton/>
                    <h4 className="comment-like-number">64</h4>
                </div>

                
            </div>
        </div>
     );
}
 
export default CommentBox;