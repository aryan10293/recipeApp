import { useState } from "react";
import { Link } from "react-router-dom";

interface ProfileIconProps{
    img:string
}

const ProfileIcon:React.FC<ProfileIconProps> = ({img}) => {

    const [imgHeight,setImgHeight] = useState("")
    const [imgWidth,setImgWidth] = useState("")
    

    const style = {
        height:{imgHeight},
        width:{imgWidth}
    }

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