import React from 'react'
interface IProps {
  ingredients: string[];
  difficulty: string;
  title: string;
  imageUrl: string
}
const CommentComp: React.FC<IProps> = ({ title, difficulty, ingredients, imageUrl }) => {
  const [comment, setComment] = React.useState<string>('')
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif', 
      color: '#333' 
    }}>
      <div style={{ 
        borderBottom: '1px solid #ccc', 
        paddingBottom: '20px', 
        marginBottom: '20px' 
      }}>
        <img 
          src={imageUrl} 
          alt={title} 
          style={{ 
            width: '100%', 
            height: 'auto', 
            borderRadius: '10px', 
            marginBottom: '15px' 
          }} 
        />
        <h2 style={{ margin: '0 0 10px 0' }}>{title}</h2>
        <p style={{ margin: '0 0 10px 0', color: '#777' }}>Difficulty: {difficulty}</p>
        <ul style={{ paddingLeft: '20px', margin: '0 0 20px 0' }}>
          {ingredients.map((ingredient, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CommentComp

