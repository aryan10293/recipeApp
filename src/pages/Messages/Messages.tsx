import { useEffect } from "react";
import Header from "../../assets/Header";
import Navbar from "../../assets/Navbar";
import MessageAsideBar from "./MessageAsideBar";
import { useNavigate } from "react-router-dom";
interface UserId{
    userId:string
}
 const Messages: React.FC<UserId> = ({userId})  => {

    const navigate = useNavigate()

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    },[])
    return ( 
        <div>
            <Navbar/>
            <Header text="Messages" margin="0 0 0 0"/>
            <MessageAsideBar userId={userId}/>
        </div>
     );
}
 
export default Messages;