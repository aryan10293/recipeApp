import { useEffect, useState } from "react"

const useGetUserDataFromId = (id:string | null) => {
    
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
    const [userFollowerNum,setUserFollowerNum] = useState<[]>()
    const [userFollowingNum,setUserFollowingNum] = useState<[]>()


   
    useEffect(()=>{
        const controller = new AbortController(); // Move inside useEffect
        const signal = controller.signal;
        const getUserId = async function() {


            try {
                
                const response = await fetch(`http://localhost:2030/getuserbyid/${id}`)
                if(!response.ok){
                    throw new Error('Issue with fetchin user data')
                }
                
                const data = await response.json()
                

                const userID =  data.user[0]._id
                const userName = data.user[0].userName
                const userPic =  data.user[0].profilePic
                const userBookmarks =  data.user[0].savedRecipes
                const userSkill =  data.user[0].skillLevel
                const firstName =  data.user[0].firstName
                const lastName =  data.user[0].lastName
                const email =  data.user[0].email
                const country =  data.user[0].country
                const dob =  data.user[0].dob
                const accountAge =  data.user[0].accountAge
                const cookingStyle =  data.user[0].cookingStyle
                const bio =  data.user[0].bio
                const followerNum = data.user[0].followers
                const followingNum = data.user[0].followings

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
                setUserFollowerNum(followerNum)
                setUserFollowingNum(followingNum)

                // console.log(followerNum,followingNum);
                
            } catch (error:Error | any) {
                console.log(error);
            }
   
        }

        getUserId()

    },[id])

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
        userBio,
        userFollowerNum,
        userFollowingNum
        
    }
}
 
export default useGetUserDataFromId;
