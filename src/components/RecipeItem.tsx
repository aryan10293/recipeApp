import React from 'react'
import { Link } from 'react-router-dom';
interface IProps {
  ingredients: string[];
  difficulty: string;
  title: string;
  imageUrl: string;
  postId:string;
  likes: number;
}
// used for to make sure apis where working not the actual ui i want to use


const RecipeItem: React.FC<IProps> = ({ postId, title, difficulty, ingredients, imageUrl }) => {
    const [userId, setUserId] = React.useState<string>('')
    React.useEffect(() => {
        const getUser = async() => {
            const checkUser = await fetch(`http://localhost:2020/getuser/${localStorage.getItem('token')}`, {
                method:'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const userData = await checkUser.json()
            setUserId(userData.userinfo[0]._id)
        }
        getUser()
    }, [])
  return (
    <></>
  )
}

export default RecipeItem