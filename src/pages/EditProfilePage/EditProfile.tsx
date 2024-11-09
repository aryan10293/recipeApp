import { useContext, useEffect } from "react";
import Navbar from "../../assets/Navbar";
import { useNavigate } from "react-router-dom";
import EditProfileCard from "../../components/EditProfileCard";
import useGetUserDataFromId from "../../Utils/useGetUserDataFromId";
import UserContext from "../../contexts/UserContext";


const EditProfile = () => {
    
    const userId = useContext(UserContext)

        // Checking if token is present
        const isThereToken = localStorage.getItem('token')
        const navigate = useNavigate()
        useEffect(()=>{
          if(!isThereToken){
              navigate('/')
          }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    // const {
    //     userUsername:userName,
    //     userProfilePicture:userProfilePicture,
    //     userCookingSkill:userCookingSkill,
    //     userCountry:userCountry,
    //     userEmail:userEmail,
    //     userFirstName:userFirstName,
    //     userLastName:userLastName,
    //     userBio:userBio,
    // } = useUserId() 

    const {
        userUsername:userUsername,
        userProfilePicture:userProfilePicture,
        userBookmarks:userBookmarks,
        userCookingSkill:userCookingSkill,
        userEmail:userEmail,
        userCountry:userCountry,
        userFirstName:userFirstName,
        userLastName:userLastName,
        userAccountAge:userAccountAge,
        userDob:userDob,
        userCookingStyle:userCookingStyle,
        userBio:userBio,
        userFollowerNum:userFollowerNum,
        userFollowingNum:userFollowingNum,

    }
         = useGetUserDataFromId(userId)


    return ( 
    <div>
        <Navbar userProfilePicture={userProfilePicture} userName={userUsername}/>
        <EditProfileCard 
            userLastName={userLastName} 
            userFirstName={userFirstName} 
            userEmail={userEmail} 
            userCountry={userCountry} 
            cookingSkill={userCookingSkill} 
            profilePicture={userProfilePicture} 
            userName={userUsername}
            bio={userBio}
            userFollowers={userFollowerNum}
            userFollowings={userFollowingNum}
            dob={userDob}
            cookingStyle={userCookingStyle}
            accountAge={userAccountAge}
            userID={userId}
            />
    </div>
    // <div>
    //     <Navbar userProfilePicture={userProfilePicture} userName={userUsername}/>
    //     <EditProfileCard 
    //         userLastName={userLastName} 
    //         userFirstName={userFirstName} 
    //         userEmail={userEmail} 
    //         userCountry={userCountry} 
    //         userID={userId} 
    //         cookingSkill={userCookingSkill} 
    //         profilePicture={userProfilePicture} 
    //         userName={userUsername}
    //         bio={userBio}
    //     />
    // </div>
     );
}
 
export default EditProfile;