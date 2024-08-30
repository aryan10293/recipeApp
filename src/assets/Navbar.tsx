import HomeButton from "./HomeButton";
import SavedRecipesButton from "./SavedRecipesButton";
import MessageButton from "./MessagesButton";
import ProfileIcon from "./ProfileIcon";
import useFetch from "./useFetch";
import { useEffect } from "react";


interface userInfo{
    userinfo:[]
}

const Navbar = () => {

    const {data:picture} = useFetch(`http://localhost:2030/getuser/${localStorage.getItem("token")}`)
    

    useEffect(()=>{
        if(picture && picture.userinfo[0]){
            console.log(picture.userinfo[0]);
        }
        
    },[picture])

    return ( 
        <div className="navbar">
            <ul className="left-side"></ul>
            <ul className="middle-side">
                <li><HomeButton/></li>
                <li><SavedRecipesButton/></li>
                <li><MessageButton/></li>
            </ul>
            <ul className="right-side">
               <ProfileIcon img={picture && picture.userinfo[0] && picture.userinfo[0].profilePic}/>
            </ul>
        </div>
     );
}
 
export default Navbar;