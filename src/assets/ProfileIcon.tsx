import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserId from "../Utils/useGetUserId";

interface ProfileIconProps{
    img:string | undefined,
    userId:string | undefined
}

const ProfileIcon:React.FC<ProfileIconProps> = ({img,userId}) => {
    
    const navigate = useNavigate()
    
    const handleClick = function(){
        navigate('/userprofile',{state:{userId:userId}})
    }

    return ( 
        <div className="profile-icon">
                <button onClick={handleClick}>
                    < img src={img} alt="" />    
                </button> 
           
        </div>
     );
}
 
export default ProfileIcon;