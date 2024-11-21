import React from 'react'
interface Like{
    id:string
    text:string
    apiCall:string
}
const LikeMessage:React.FC<Like> = ({id, text, apiCall}) => {
    const handleLike = async (e:any) => {
        console.log(apiCall,id)
        e.preventDefault()
        const handleAction = await fetch(`https://recipeapp-22ha.onrender.com/${apiCall}/${id}`, {
            method:'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        })
    }
  return (
    <button onClick={handleLike}>
      {text}
    </button>
  )
}

export default LikeMessage
