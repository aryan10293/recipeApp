import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserId from "../Utils/useGetUserId";

interface ProfileIconProps{
    img:string | null,
}

const ProfileIcon:React.FC<ProfileIconProps> = ({img}) => {
    
    const navigate = useNavigate()

    const {userId:userId} = useUserId()
    
    const handleClick = function(){
        navigate('/userprofile',{state:{userId:userId}})
    }

    return ( 
        <div className="profile-icon">
            {/* <Link to={"/userprofile"}>
                <button>
                < img src={img} alt="" />    
                </button> 
            </Link> */}
            
                <button onClick={handleClick}>
                < img src={img} alt="" />    
                </button> 
           
        </div>
     );
}
 
export default ProfileIcon;