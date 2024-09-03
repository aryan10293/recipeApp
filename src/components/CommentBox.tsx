import { useEffect, useState } from "react";
import LikeButton from "../assets/LikeButton";

interface CommentsProps{
    classs2:string,
    classs4:string
    postId:string,
    handleNewComment:()=>void
}

interface NewComment{
    userId: string,
    postId: String,
    likes:string[],
    comment: String,
}

const hrStyle = {
    width:'1000px',
    border:'1px solid #f8f5f2',
    outline:'none'
}

const CommentBox:React.FC<CommentsProps> = ({classs2,classs4,postId,handleNewComment}) => {

    const [postContent,setPostContent] = useState<string>("")
    const [userId,getUserId] = useState("")


    const getUsersId = async (): Promise<string | any> =>{
        try {
            const token = await localStorage.getItem("token")
            const response = await fetch(`http://localhost:2030/getuser/${token}`)
            const userData = await response.json()
            return userData.userinfo[0]._id as string 
        } catch (error) {
            console.log('Could not get userId for comment posting',error)
        }
    }
 

    const sendPostHandle = async():Promise<void>=>{   
        try {
            const id:string  = await getUsersId()

            const postBody:NewComment = {
                comment:postContent,
                userId: id,
                postId: postId,
                likes:["wdasd"],
            }

            const response = await fetch(`http://localhost:2030/createcomment`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(postBody)
                
                })
                
                if(!response.ok){
                    throw Error('Problem with fetching createcomment and posting comment')
                }

                const data = await response.json()
                console.log('Sucess! Data: ',data,postBody)
                handleNewComment()

        } catch (error) {
            console.log('Issue with creating comment',error)
        }
    }

    // useEffect(()=>{
    //     console.log(postContent);
        
    // },[postContent])


    return ( 
        <div className={classs4}>
            <div className={classs2}>
                <textarea onChange={(e)=>setPostContent(e.target.value)} className="new-comment-input" placeholder="Your comment..." name="" id=""></textarea>
                <button onClick={sendPostHandle} className="send-comment-btn">Send</button>
            </div>
        </div>
     );
}
 
export default CommentBox;