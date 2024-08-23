import React from 'react'
import { useParams } from 'react-router-dom'
import { Fragment } from 'react'
import CommentComp from '../../components/CommentComp'
import CommentItem from '../../components/CommentItem'
function Comment() {
    const [post, setPost] = React.useState<any>()
    const [userId, setUserId] = React.useState<string>('')
    const [postComments, setPostComments] = React.useState<any[]>([])
    const [comment, setComment] = React.useState<string>('')
    const params = useParams()
    const id = params.id
    interface CommentInfo{
        userId: string,
        postId: string,
        comment: string
    }
    const createComment: CommentInfo = {
        userId: userId,
        postId: '',
        comment: comment
    }
    if(id){
        createComment.postId = id
    }
    const getCommentInfo = async() => {
            const getComments = await fetch(`http://localhost:2020/getcommentsfrompost/${id}`, {
                method:'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const commentData = await getComments.json() 
            if(commentData.status == '200'){
                setPostComments(commentData.comments.reverse())
            }
        }
    React.useEffect(() => {
        const getUser = async() => {
            const checkUser = await fetch(`http://localhost:2020/getuser/${localStorage.getItem('token')}`, {
                method:'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const userData = await checkUser.json()
            setUserId(userData.userinfo[0]._id)
        }
        getUser()
    }, [])

    React.useEffect(() => {
        const getPostInfo = async() => {
            const getPost = await fetch(`http://localhost:2020/getpost/${id}`, {
                method:'GET',
                headers: {'Content-Type': 'application/json'}
            })

            const postData = await getPost.json() 
            setPost(postData)

        }
        getPostInfo()
    }, [id])
    React.useEffect(() => {
        getCommentInfo()
    }, [id])


    const handleSubmit =  async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const postComment = await fetch(`http://localhost:2020/createcomment`,{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(createComment),
            })
            const commentData = await postComment.json()
            console.log(commentData)
            if(commentData.status == '200'){
                getCommentInfo()
                setComment('')
            }
        } catch (error) {
            console.log(error)
        }
    }
    if (!post || !post.post || post.post.length === 0) {
        return <p>Loading post data...</p>; // Render this until the data is fetched
    }
    console.log(postComments)
  return (
    
   
   <>
        <div>
            <CommentComp
                title={'chicken'}
                difficulty={post.post[0].levelOfMeal}
                ingredients={post.post[0].ingridentList}
                imageUrl={post.post[0].image}
            />
            <div>
        <textarea 
          value={comment}
          onChange={(e:any) => {setComment(e.target.value)}}
          placeholder="Write your comment here..."
          style={{ 
            width: '100%', 
            height: '100px', 
            padding: '10px', 
            borderRadius: '5px', 
            border: '1px solid #ccc', 
            fontSize: '1em',
            marginBottom: '15px' 
          }}
        />
        <button 
          onClick={handleSubmit} 
          style={{ 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '5px', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '1em' 
          }}
          onMouseOver={(e:any) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e:any) => e.target.style.backgroundColor = '#4CAF50'}
        >
          Submit Comment
        </button>
      </div>
        </div>

    
            {postComments.length > 0 ? (
                postComments.map((x:any, i:any) => {
                    return (
                        <CommentItem
                        timeOfPost={x.timeOfPost}
                        commentorId={'x.commentorId  make a get request to get the user name'}
                        comment={x.comment}
                        likes={x.likes.length}
                        />
                    )
                })
            ): (
                <span>no comments on this recipe</span>
            )} 
        
   </>
 
  )
}

export default Comment
