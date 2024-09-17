import { useContext, useEffect, useState } from "react";
import Navbar from "../../assets/Navbar";
import ProfileCard from "../../components/ProfileCard";
import UserNameButton from "../../components/UsernameButton";
import useUserId from "../../Utils/useGetUserId";
import { useLocation, useNavigate } from "react-router-dom";
import EditProfileCard from "../../components/EditProfileCard";
import useGetUserDataFromId from "../../Utils/useGetUserDataFromId";
import UserContext from "../../contexts/UserContext";


const EditProfile = () => {
    
    const userId = useContext(UserContext)

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
        userFollowingNum:userFollowingNum}
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