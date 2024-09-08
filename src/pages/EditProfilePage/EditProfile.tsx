import Navbar from "../../assets/Navbar";
import ProfileCard from "../../components/ProfileCard";
import UserNameButton from "../../components/UsernameButton";
import useUserId from "../../Utils/useGetUserId";


const EditProfile = () => {

    const {
        userUsername:userName,
        userProfilePicture:userProfilePicture,
        userCookingSkill:userCookingSkill,
        userId:userID,
        userCountry:userCountry,
        userEmail:userEmail,
        userFirstName:userFirstName,
        userLastName:userLastName
    
    } = useUserId()

    return ( 
        <div>
        <Navbar userProfilePicture={userProfilePicture} userName={userName}/>
        <ProfileCard 
        userLastName={userLastName} 
        userFirstName={userFirstName} 
        userEmail={userEmail} 
        userCountry={userCountry} 
        userID={userID} 
        cookingSkill={userCookingSkill} 
        profilePicture={userProfilePicture} 
        userName={userName} />
        <UserNameButton  />
    </div>
     );
}
 
export default EditProfile;