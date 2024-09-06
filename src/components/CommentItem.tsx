import React from 'react'
import {  useParams } from 'react-router-dom'
interface IProps {
  timeOfPost: string,
  commentorId: string,
  comment: string,
  likes: number[]
  // make sure to change the likes to acepts strings not numbers
}
// used for to make sure apis where working not the actual ui i want to use
const CommentItem: React.FC<IProps> = ({ timeOfPost, commentorId, comment, likes }) => {
    const params = useParams()
    const id = params.id
    console.log(id)
    const [commentorName , setCommentorName] = React.useState<string>('')
    
    React.useEffect(() => {
        const getCommentorName = async() => {
            const getName = await fetch (`http://localhost:2020/getuserbyid/${commentorId}`, {
                method:'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const nameData = await getName.json()
            setCommentorName(nameData.user[0].userName)
        }
        getCommentorName()
    }, [])
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
        <span style={{ fontWeight: 'bold' }}>Commentor: {commentorName}</span>
        <span style={{ fontSize: '0.8em', color: '#777' }}>{new Date(timeOfPost).toLocaleString()}</span>
      </div>
      <p style={{ marginBottom: '10px' }}>{comment}</p>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div>
          <span style={{ fontSize: '0.9em', marginRight: '10px' }}>Likes: {likes.length}</span>
          <button 
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
            Like
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
