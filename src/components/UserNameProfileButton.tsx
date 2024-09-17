import { faL } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserNameButtonProps{
    postsId:string,
    className?:string,
    commentorId?:string
}


const UserNameProfileButton:React.FC<UserNameButtonProps> = ({postsId,className,commentorId}) => {
    
    const navigate = useNavigate()
    const [posterUsername,setPosterUsername] = useState<string>()
    const [posterId,setPosterId] = useState<string>()
    const [pending,setPending] = useState<boolean>()

    // Getting the username from commentor ID
    const findCommentOwner = async function(id:string){
        try {
            const response = await fetch(`http://localhost:2030/getuserbyid/${id}`)
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
        } catch (error) {
            console.log('Error while fetching the user/username',error)
        }
    }

    // Finding the recipe owner if no commentorId is present
    const findRecipeOwner = async function(){
        try {
            const response = await fetch(`http://localhost:2030/getpost/${postsId}`)
            if(!response.ok){
                throw new Error('Failed to fetch user data')
            }
            const data = await response.json()
            
            if(!data){
                throw new Error('Recipe is not found')
            }
            
            const id = data.post[0].userWhoPostId
            setPosterId(id)
            if(!data){
                throw new Error('Did not find the user who posted the recipe')
            }
            
            const ownerResponse = await fetch(`http://localhost:2030/getuserbyid/${id}`) 
            const recipeOwnerData = await ownerResponse.json()
            if(!response.ok){
                throw new Error('Did not find post owner')
            }
            const recipeOwnerUsername = recipeOwnerData.user[0].userName

            setPosterUsername(recipeOwnerUsername)
            
        } catch (error) {
            console.log(error)
        }
    }

    // Decide which username to print
    const findUsername = async function(){
        try {
            setPending(true)
            if(commentorId){
                await findCommentOwner(commentorId)
                setPending(false)
            }
            else{
                findRecipeOwner()
                setPending(false)
            }
        } catch (error) {
            console.log(error)
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
            console.log(error)
        }
    }

    



    return ( 
           < button className={className} style={{fontSize:'1rem'}} onClick={(e)=>handleClick(e)}>
                {pending ? <p className="pending-msg">Loading..</p> : posterUsername}
            </button>
        
     );
}
 
export default UserNameProfileButton;