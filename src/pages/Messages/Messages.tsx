import Header from "../../assets/Header";
import Navbar from "../../assets/Navbar";
import MessageAsideBar from "./MessageAsideBar";

const Messages = () => {
    return ( 
        <div>
            <Navbar/>
            <Header text="Messages" margin="0 0 0 0"/>
            <MessageAsideBar/>
        </div>
     );
}
 
export default Messages;