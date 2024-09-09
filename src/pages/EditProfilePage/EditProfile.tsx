import { useEffect, useState } from "react";
import Navbar from "../../assets/Navbar";
import ProfileCard from "../../components/ProfileCard";
import UserNameButton from "../../components/UsernameButton";
import useUserId from "../../Utils/useGetUserId";
import { useLocation, useNavigate } from "react-router-dom";
import EditProfileCard from "../../components/EditProfileCard";


const EditProfile = () => {


    const navigate = useNavigate()

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    },[])

    const {
        userUsername:userName,
        userProfilePicture:userProfilePicture,
        userCookingSkill:userCookingSkill,
        // userId:userID,
        userCountry:userCountry,
        userEmail:userEmail,
        userFirstName:userFirstName,
        userLastName:userLastName,
        userBio:userBio
    
    } = useUserId()
    

    const location = useLocation()
    const {userId} = location.state || {}



    return ( 
    <div>
        <Navbar userProfilePicture={userProfilePicture} userName={userName}/>
        <EditProfileCard 
            userLastName={userLastName} 
            userFirstName={userFirstName} 
            userEmail={userEmail} 
            userCountry={userCountry} 
            userID={userId} 
            cookingSkill={userCookingSkill} 
            profilePicture={userProfilePicture} 
            userName={userName}
            bio={userBio}
            />
    </div>
     );
}
 
export default EditProfile;