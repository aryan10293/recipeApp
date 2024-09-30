
interface UserIconProps{
    userName:string | null,
    userProfilePic:string | undefined,
}


const UserIcons:React.FC<UserIconProps> = ({userName,userProfilePic}) => {

    return ( 
        <div className="user-icon">
            
            <div className="picture">
                <img src={userProfilePic} alt="" />
            </div>

            <h2>{userName}</h2>
        </div>
     );
}
 
export default UserIcons;