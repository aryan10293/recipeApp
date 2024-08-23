import React from 'react'
interface IProps {
  timeOfPost: string,
  commentorId: string,
  comment: string,
  likes: number[]
  // make sure to change the likes to acepts strings not numbers
}
const CommentItem: React.FC<IProps> = ({ timeOfPost, commentorId, comment, likes }) => {
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
        <span style={{ fontWeight: 'bold' }}>Commentor: {commentorId}</span>
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
