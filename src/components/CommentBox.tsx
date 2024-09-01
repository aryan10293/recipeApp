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
    classs4:string
}

const hrStyle = {
    width:'1000px',
    border:'1px solid #f8f5f2',
    outline:'none'
}

const CommentBox:React.FC<CommentsProps> = ({classs,classs2,classs4}) => {
    return ( 
        <div className={classs4}>
            <div className={classs2}>
                <textarea className="new-comment-input" placeholder="Your comment..." name="" id=""></textarea>
                <button className="send-comment-btn">Send</button>
            </div>
        </div>
     );
}
 
export default CommentBox;