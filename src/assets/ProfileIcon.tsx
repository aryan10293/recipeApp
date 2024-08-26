import { useState } from "react";
import { Link } from "react-router-dom";


const ProfileIcon = () => {

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
                < img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.AwGBn0RaiFXEpXemdj-2LQHaLG%26pid%3DApi&f=1&ipt=c36c3dbbe2ff8cf98229f7b0d4c86f86610cadc99cbf5207e96bbf2559e303c9&ipo=images" alt="" />
                </button>
            </Link>
        </div>
     );
}
 
export default ProfileIcon;