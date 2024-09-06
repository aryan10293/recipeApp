import { useEffect, useState } from "react"

const useUserId = () => {
    
    const [userId,setUserId] = useState<string | null>(null)
    const [userUsername,setUserUsername] = useState<string | null>(null)
    const [userProfilePicture,setUserProfilePicture] = useState<string | null>(null)
    const [userBookmarks,setUserBookmarks] = useState<[]>()
   
    useEffect(()=>{
        const getUserId = async function() {

            try {
                const token = localStorage.getItem('token')
                if(!token){
                    throw new Error('Token is not found')
                }
        
                const response = await fetch(`http://localhost:2030/getuser/${token}`)
                if(!response.ok){
                    throw new Error('Issue with fetchin user data')
                }
        
                const data = await response.json()

                const userID = await data.userinfo[0]._id
                const userName = await data.userinfo[0].userName
                const userPic = await data.userinfo[0].profilePic
                const userBookmarks = await data.userinfo[0].savedRecipes
                setUserUsername(userName)
                setUserId(userID)
                setUserProfilePicture(userPic)
                setUserBookmarks(userBookmarks)

                

            } catch (error) {
                console.log(error)   
            }      
        }

        getUserId()
    },[])

    return {userId,userUsername,userProfilePicture,userBookmarks}
}
 
export default useUserId;
