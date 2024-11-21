import { faL } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PendingMessage from "./PendingMessage";

interface UserNameButtonProps{
    postsId:string,
    className?:string,
    commentorId?:string
}


const UserNameProfileButton:React.FC<UserNameButtonProps> = ({postsId,className,commentorId}) => {
    
    const navigate = useNavigate()
    const [posterUsername,setPosterUsername] = useState<string>()
    const [posterId,setPosterId] = useState<string>()
    const [pending,setPending] = useState<boolean>(true)

    // Getting the username from commentor ID
    const findCommentOwner = async function(id:string){
        try {
            setPending(true)
            const response = await fetch(`https://recipeapp-22ha.onrender.com/getuserbyid/${id}`)
            const user = await response.json()
            if(!response.ok){
                throw new Error('Response is not okay. Could not fetch user.')
            }
            const userName = await user.user[0].userName
           
            if(!userName){
                throw new Error('userName could not be destructed')
            }
            // console.log('Username is: ',userName)
            setPosterId(id)
            setPosterUsername(userName)
            setPending(false)
        } catch (error) {
            // console.log('Error while fetching the user/username',error)
            setPending(false)
        }
    }

    // Finding the recipe owner if no commentorId is present
    const findRecipeOwner = async function(){
        // console.log(postsId)
        try {
            setPending(true)
            const response = await fetch(`https://recipeapp-22ha.onrender.com/getpost/${postsId}`)
            if(!response.ok){
                throw new Error('Failed to fetch user data')
            }
            const data = await response.json()
            // console.log(data)
            if(!data){
                throw new Error('Recipe is not found')
            }
            
            const id = data.post[0].userWhoPostId
            setPosterId(id)
            if(!data){
                throw new Error('Did not find the user who posted the recipe')
            }
            
            const ownerResponse = await fetch(`https://recipeapp-22ha.onrender.com/getuserbyid/${id}`) 
            const recipeOwnerData = await ownerResponse.json()
            if(!response.ok){
                throw new Error('Did not find post owner')
            }
            const recipeOwnerUsername = recipeOwnerData.user[0].userName

            setPosterUsername(recipeOwnerUsername)
            setPending(false)
        } catch (error) {
            // console.log(error)
            setPending(false)
        }
    }

    // Decide which username to print
    const findUsername = async function(){
        try {
            setPending(true)
            if(commentorId){
                await findCommentOwner(commentorId)
            }
            else{
                findRecipeOwner()
            }
        } catch (error) {
            // console.log(error)
            setPending(false)
        }
    }

    useEffect(()=>{
        findUsername()
    },[commentorId])

    const handleClick = async function(e:React.MouseEvent){
        try {
            e.stopPropagation()
            navigate('/profile',{state:{userID:posterId}})
        } catch (error) {
            // console.log(error)
        }
    }

    return ( 
           < button className={className} style={{fontSize:'1rem'}} onClick={(e)=>handleClick(e)}>
                {pending ? <PendingMessage/> : posterUsername}
            </button>
     );
}
 
export default UserNameProfileButton;