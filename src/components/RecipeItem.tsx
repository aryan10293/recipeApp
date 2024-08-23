import React from 'react'
interface IProps {
  ingredients: string[];
  difficulty: string;
  title: string;
  imageUrl: string
}
// used for to make sure apis where working not the actual ui i want to use
const RecipeItem: React.FC<IProps> = ({ title, difficulty, ingredients, imageUrl }) => {
  return (
    <li style={{ 
      border: '1px solid #ccc', 
      borderRadius: '5px', 
      padding: '15px', 
      margin: '10px 0', 
      listStyleType: 'none',
      display: 'flex',
      alignItems: 'center'
    }}>
      <img 
        src={imageUrl} 
        alt={title} 
        style={{ 
          width: '100px', 
          height: '100px', 
          objectFit: 'cover', 
          borderRadius: '5px', 
          marginRight: '15px' 
        }} 
      />
      <div>
        <h3 style={{ 
          margin: '0 0 10px 0', 
          fontSize: '1.2em', 
          color: '#333' 
        }}>{title}</h3>
        <p style={{ 
          margin: '0 0 10px 0', 
          fontSize: '0.9em', 
          color: '#777' 
        }}>Difficulty: {difficulty}</p>
        <ul style={{ 
          padding: '0', 
          margin: '0', 
          listStyleType: 'disc', 
          paddingLeft: '20px' 
        }}>
          {ingredients.map((ingredient, index) => (
            <li key={index} style={{ 
              fontSize: '0.9em', 
              color: '#555' 
            }}>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default RecipeItem
