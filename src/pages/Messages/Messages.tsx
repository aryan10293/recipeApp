import { useEffect } from "react";
import Header from "../../assets/Header";
import Navbar from "../../assets/Navbar";
import { useNavigate } from "react-router-dom";


const Messages = () => {

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
        </div>
     );
}
 
export default Messages;