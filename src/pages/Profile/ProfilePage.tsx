import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../assets/Navbar";
import ProfileCard from "../../components/ProfileCard";
import useUserId from "../../Utils/useGetUserId";
import useGetUserDataFromId from "../../Utils/useGetUserDataFromId";
import { useEffect } from "react";

interface ProfileCardProps{
    userName:string | null,
    profilePicture:string | undefined,
    cookingSkill:string | undefined,
    userEmail:string | undefined,
    userCountry:string | undefined,
    userFirstName:string | undefined,
    userLastName:string | undefined,
    cookingStyle:string | undefined,
    dob:string | undefined,
    accountAge: string | undefined,
    userFollowerNum: []
}

const ProfilePage = () => {


    const location = useLocation()
    const {userID} = location.state || {} 
    const {userUsername:userUsername,userProfilePicture:userProfilePicture}=useUserId()
    const {userBio:userBio,userAccountAge:userAccountAge,userDob:userDob,userCookingStyle:userCookingStyle,userProfilePicture:profilePicture,userUsername:userName,userFirstName:firstName,userLastName:lastName,userEmail:email,userCountry:country,userCookingSkill:cookingSkill,userFollowerNum:userFollowerNum,userFollowingNum:userFollowingNum} = useGetUserDataFromId(userID)
    
    useEffect(()=>{
        console.log(userDob,userName,userID);
        
    },[])

    return ( 

        <div>  
            <Navbar userName={userUsername} userProfilePicture={userProfilePicture}/>
            <ProfileCard userFollowingNum={userFollowingNum} userFollowerNum={userFollowerNum} bio={userBio} userID={userID} dob={userDob} cookingStyle={userCookingStyle} accountAge={userAccountAge} cookingSkill={cookingSkill} profilePicture={profilePicture} userName={userName} userFirstName={firstName} userLastName={lastName} userEmail={email} userCountry={country} />
        </div>

     );
}
 
export default ProfilePage;