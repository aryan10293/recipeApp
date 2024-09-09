import { useEffect, useState } from "react"

const useUserId = () => {
    
    const [userId,setUserId] = useState<string | null>(null)
    const [userUsername,setUserUsername] = useState<string | null>(null)
    const [userProfilePicture,setUserProfilePicture] = useState<string | undefined>(undefined)
    const [userBookmarks,setUserBookmarks] = useState<[]>()
    const [userCookingSkill,setUserCookingSkill] = useState<string>()
    const [userFirstName,setUserFirstName] = useState<string>()
    const [userLastName,setUserLastName] = useState<string>()
    const [userDob,setUserDob] = useState<string>()
    const [userDateOfRegistry,setUserDateOfRegistry] = useState<string>()
    const [userEmail,setUserEmail] = useState<string>()
    const [userCountry,setUserCountry] = useState<string>()
    const [userCookingStyle,setUserCookingStyle] = useState<string>()
    const [userBio,setUserBio] = useState<string>("")

   
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
                const userSkill = await data.userinfo[0].skillLevel
                const firstName = await data.userinfo[0].firstName
                const lastName = await data.userinfo[0].lastName
                const email = await data.userinfo[0].email
                const country = await data.userinfo[0].country
                const dob = await data.userinfo[0].dob
                const cookingStyle = await data.userinfo[0].cookingStyle
                const bio = await data.userinfo[0].bio

                setUserUsername(userName)
                setUserId(userID)
                setUserProfilePicture(userPic)
                setUserBookmarks(userBookmarks)
                setUserCookingSkill(userSkill)
                setUserFirstName(firstName)
                setUserLastName(lastName)
                setUserEmail(email)
                setUserCountry(country)
                setUserDob(dob)
                setUserCookingStyle(cookingStyle)
                setUserBio(bio)

            } catch (error) {
                console.log(error)   
            }      
        }

        getUserId()
    },[])

    return {
        userId,
        userUsername,
        userProfilePicture,
        userBookmarks,
        userCookingSkill,
        userEmail,
        userCountry,
        userFirstName,
        userLastName,
        userDob,
        userCookingStyle,
        userBio

    }
}
 
export default useUserId;
