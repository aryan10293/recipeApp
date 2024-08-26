import HomeButton from "./HomeButton";
import SavedRecipesButton from "./SavedRecipesButton";
import MessageButton from "./MessagesButton";
import ProfileIcon from "./ProfileIcon";


const Navbar = () => {

    return ( 
        <div className="navbar">
            <ul className="left-side"></ul>
            <ul className="middle-side">
                <li><HomeButton/></li>
                <li><SavedRecipesButton/></li>
                <li><MessageButton/></li>
            </ul>
            <ul className="right-side">
               <ProfileIcon/>
            </ul>
        </div>
     );
}
 
export default Navbar;