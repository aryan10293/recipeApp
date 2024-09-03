import { useState } from "react";
import { Link } from "react-router-dom";

interface ProfileIconProps{
    img:string,
    userName:string
}

const ProfileIcon:React.FC<ProfileIconProps> = ({img,userName}) => {
    

    return ( 
        <div className="profile-icon">
            <Link to={"/profile"}>
                <button>
                < img src={img} alt="" />    
                </button>   
            </Link>
        </div>
     );
}
 
export default ProfileIcon;