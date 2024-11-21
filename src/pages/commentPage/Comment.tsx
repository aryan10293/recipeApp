import React from 'react'
import { json, useParams } from 'react-router-dom'
import { Fragment } from 'react'
import CommentComp from '../../components/CommentComp'
import CommentItem from '../../components/CommentItem'
function Comment() {
    const [post, setPost] = React.useState<any>()
    const [userId, setUserId] = React.useState<string>('')
    const [postComments, setPostComments] = React.useState<any[]>([])
    const [comment, setComment] = React.useState<string>('')
    const [name, setName] = React.useState<string>('')
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
    interface Obj{
        userId:string,
    }
    const likeObj: Obj = {
        userId : userId
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
    const handleLike = async (e:any) => {
        //switch the e to type strictness later drej. im just to lazy to do it know
        e.preventDefault()
        let likeUnlike:string = ''
        console.log(e.target.textContent)
        if(e.target.textContent === 'Like'){
            likeUnlike = 'addliketocomment'
        } else {
            likeUnlike = 'unlikecomment'
        }
        const commentId = e.currentTarget.getAttribute('data-id')
        const handlelikes = await fetch(`http://localhost:2020/${likeUnlike}/${commentId}`, {
            method:'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(likeObj)
        })
        const handleLikesData = await handlelikes.json()
        console.log(handleLikesData)
        getCommentInfo()
    }
    if (!post || !post.post || post.post.length === 0) {
        return <p>Loading post data...</p>; 
    }
  return (
    
   
   <>
        <div>
            <CommentComp
                title={post.post[0].nameOfDish}
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
                postComments.map( (x:any, i:any) => {
                    const getNameOfThatCommentedOnPost = async () => {

                        const getCommentorName = await fetch(`https://recipeapp-22ha.onrender.com/getuserbyid/${x.commentorId}`, {
                        method:'GET',
                        headers: {'Content-Type': 'application/json'},
                    })
                        const name = await getCommentorName.json()
                        setName(name.user[0].userName)
                        // this may need more testing  we will find out later
                    }
                    getNameOfThatCommentedOnPost()
                    return (
                        <div style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '15px',
                                margin: '10px 0',
                                fontFamily: 'Arial, sans-serif',
                                color: '#333',
                                backgroundColor: '#f9f9f9'
                            }}>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            marginBottom: '10px' 
                        }}>
                            <span style={{ fontWeight: 'bold' }}>Commentor: {name}</span>
                            <span style={{ fontSize: '0.8em', color: '#777' }}>{new Date('timeOfPost').toLocaleString()}</span>
                        </div>
                        <p style={{ marginBottom: '10px' }}>{x.comment}</p>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center' 
                        }}>
                            <div>
                            <span style={{ fontSize: '0.9em', marginRight: '10px' }}>Likes: {x.likes.length}</span>
                            <button 
                                onClick={handleLike}
                                data-id={x._id}
                                style={{
                                backgroundColor: '#4CAF50', 
                                color: 'white', 
                                padding: '5px 10px', 
                                borderRadius: '5px', 
                                border: 'none', 
                                cursor: 'pointer', 
                                fontSize: '0.9em'
                                }}
                                onMouseOver={(e:any) => e.target.style.backgroundColor = '#45a049'}
                                onMouseOut={(e:any) => e.target.style.backgroundColor = '#4CAF50'}
                            >
                                {x.likes.includes(userId) ? 'Unlike' : 'Like'}
                            </button>
                            </div>
                        </div>
    </div>
                    )
                })
            ): (
                <span>no comments on this recipe</span>
            )} 
        
   </>
 
  )
}

export default Comment
