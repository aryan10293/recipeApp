import { useEffect, useState } from "react"

const useGetUserDataFromId = (id:string) => {
    
    const [userId,setUserId] = useState<string | null>(null)
    const [userUsername,setUserUsername] = useState<string | null>(null)
    const [userProfilePicture,setUserProfilePicture] = useState<string | undefined>(undefined)
    const [userBookmarks,setUserBookmarks] = useState<[]>()
    const [userCookingSkill,setUserCookingSkill] = useState<string>()
    const [userFirstName,setUserFirstName] = useState<string>()
    const [userLastName,setUserLastName] = useState<string>()
    const [userDob,setUserDob] = useState<string>()
    const [userAccountAge,setUserAccountAge] = useState<string>()
    const [userEmail,setUserEmail] = useState<string>()
    const [userCountry,setUserCountry] = useState<string>()
    const [userCookingStyle,setUserCookingStyle] = useState<string>() 
    const [userBio,setUserBio] = useState<string>("")

   
    useEffect(()=>{
        const getUserId = async function() {

            try {
                
                const response = await fetch(`http://localhost:2030/getuserbyid/${id}`)
                if(!response.ok){
                    throw new Error('Issue with fetchin user data')
                }
                
                const data = await response.json()
                

                const userID = await data.user[0]._id
                const userName = await data.user[0].userName
                const userPic = await data.user[0].profilePic
                const userBookmarks = await data.user[0].savedRecipes
                const userSkill = await data.user[0].skillLevel
                const firstName = await data.user[0].firstName
                const lastName = await data.user[0].lastName
                const email = await data.user[0].email
                const country = await data.user[0].country
                const dob = await data.user[0].dob
                const accountAge = await data.user[0].accountAge
                const cookingStyle = await data.user[0].cookingStyle
                const bio = await data.user[0].bio


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
                setUserAccountAge(accountAge)
                setUserCookingStyle(cookingStyle)
                setUserBio(bio)

                console.log(dob,cookingStyle);
                

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
        userAccountAge,
        userDob,
        userCookingStyle,
        userBio
        
    }
}
 
export default useGetUserDataFromId;
