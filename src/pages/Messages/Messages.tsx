import { useContext, useEffect } from "react";
import Header from "../../assets/Header";
import Navbar from "../../assets/Navbar";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import useGetUserDataFromId from "../../Utils/useGetUserDataFromId";
import MessagesContainer from "./MessagesContainer";

 const Messages = ()  => {

    const userID = useContext(UserContext)
    const {userProfilePicture:userProfilePicture,userUsername:userName} = useGetUserDataFromId(userID)
        // Checking if token is present
        const isThereToken = localStorage.getItem('token')
        const navigate = useNavigate()
        useEffect(()=>{
          if(!isThereToken){
              navigate('/')
          }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])


    return ( 
        <div className="messages-page">
            <Navbar userName={userName} userProfilePicture={userProfilePicture}/>
            <Header text="Messages" margin="0 0 0 0"/>
            <MessagesContainer/>
            {/* <MessageContainer2/> */}
        </div>
     );
}
 
export default Messages;