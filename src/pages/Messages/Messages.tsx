import { useCallback, useContext, useEffect } from "react";
import Header from "../../assets/Header";
import Navbar from "../../assets/Navbar";
import MessageAsideBar from "./MessageAsideBar";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import useGetUserDataFromId from "../../Utils/useGetUserDataFromId";
import MessagesWindow from "./MessagesContainer";
import MessagesContainer from "./MessagesContainer";
import MessageContainer2 from "./MessageContainer2";

 const Messages = ()  => {

    const userID = useContext(UserContext)
    const {userProfilePicture:userProfilePicture,userUsername:userName} = useGetUserDataFromId(userID)
    


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