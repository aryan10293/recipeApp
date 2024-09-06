import HomeButton from "./HomeButton";
import SavedRecipesButton from "./SavedRecipesButton";
import MessageButton from "./MessagesButton";
import ProfileIcon from "./ProfileIcon";
import useFetch from "./useFetch";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";


interface userInfo{
    userinfo:[]
}
interface NavbarProps{
    userName:string | null, 
    userProfilePicture:string | null
}

const Navbar:React.FC<NavbarProps> = ({userName,userProfilePicture}) => {

    const {data:picture} = useFetch(`http://localhost:2030/getuser/${localStorage.getItem("token")}`)
    
    return ( 
        <div className="navbar">
            <ul className="left-side"></ul>
            <ul className="middle-side">
                <li><HomeButton/></li>
                <li><SavedRecipesButton/></li>
                <li><MessageButton/></li>
            </ul>
            <ul className="right-side">
            <Link style={{textDecoration:'none'}} to={"/profile"}>
                <button style={{backgroundColor:'transparent',border:'none',margin:'auto 10px', fontWeight:'400',fontSize:'1rem',height:'100%'}}>       
                        {picture && picture.userinfo[0].userName}                  
                </button>
            </Link>
               < ProfileIcon img={userProfilePicture}/>
               
            </ul>
        </div>
     );
}
 
export default Navbar;