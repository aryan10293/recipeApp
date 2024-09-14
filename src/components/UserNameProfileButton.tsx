import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserNameButtonProps{
    postsId:string,
    className?:string
}


const UserNameProfileButton:React.FC<UserNameButtonProps> = ({postsId,className}) => {
    
    useEffect(()=>{
        findRecipeOwner()    
    },[])
    
    const navigate = useNavigate()
    const [posterUsername,setPosterUsername] = useState<string>()
    const [posterId,setPosterId] = useState<string>()
    const [pending,setPending] = useState<boolean>()
    

    const handleClick = async function(e:React.MouseEvent){
        try {
            e.stopPropagation()
            navigate('/profile',{state:{userID:posterId}})
        } catch (error) {
            console.log(error)
        }
    }


    const findRecipeOwner = async function(){
        try {
            setPending(true)
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
            setPending(false)
            
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