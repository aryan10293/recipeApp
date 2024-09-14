import { useEffect, useState } from "react";
import LikeButton from "../assets/LikeButton";

interface CommentsProps{
    classs2:string,
    classs4:string
    postId:string | undefined,
    handleNewComment:()=>void,
    userId:string | null

}

interface NewComment{
    userId: string | undefined,
    postId: String,
    comment: String,
}

const CommentBox:React.FC<CommentsProps> = ({classs2,classs4,postId,handleNewComment,userId}) => {

    const [postContent,setPostContent] = useState<string | null>("")

    const sendCommentHandle = async():Promise<void>=>{   
        try {
            const postBody:NewComment = {
                comment:postContent,
                userId: userId,
                postId: postId,     
            }

            const response = await fetch(`http://localhost:2030/createcomment`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(postBody)
                
                })
                
                if(!response.ok){
                    throw Error('Problem with creating and posting comment and getting the response')
                }

                const data = await response.json()
                console.log('Sucess! Data: ',data,postBody)
                setPostContent("")
                await handleNewComment()
                

        } catch (error) {
            console.log('Issue with creating comment',error)
        }
    }

    const clickHandle = async function(){
        try {
            await sendCommentHandle()
        } catch (error) {
            console.log(error)
        }
    }


    return ( 
        <div className={classs4}>
            <div className={classs2}>
                {<textarea value={postContent} onChange={(e)=>setPostContent(e.target.value)} className="new-comment-input" placeholder="Your comment..." name="" id=""></textarea>}
                <button onClick={clickHandle} className="send-comment-btn">Send</button>
            </div>
        </div>
     );
}
 
export default CommentBox;