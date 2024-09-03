import HomeButton from "./HomeButton";
import SavedRecipesButton from "./SavedRecipesButton";
import MessageButton from "./MessagesButton";
import ProfileIcon from "./ProfileIcon";
import useFetch from "./useFetch";
import { useEffect } from "react";
import { Link } from "react-router-dom";


interface userInfo{
    userinfo:[]
}

const Navbar = () => {

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
               < ProfileIcon userName={picture && picture.userinfo[0].userName} img={picture && picture.userinfo[0] && picture.userinfo[0].profilePic}/>
               
            </ul>
        </div>
     );
}
 
export default Navbar;