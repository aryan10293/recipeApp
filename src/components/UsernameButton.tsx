interface UserNameButtonProps{
    text:string,

}

const UserNameButton:React.FC<UserNameButtonProps> = ({text}) => {

    const handleClick = async function(){
        try {
            const token =  await localStorage.getItem("token")
            const user = await fetch(`http://localhost:2030/getuser/${token}`)
            const userData = await user.json()
            const userId = userData.userinfo[0]._id    
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <button onClick={handleClick}>
            {text}
        </button>
     );
}
 
export default UserNameButton;