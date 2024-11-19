interface UserNameButtonProps{
    text:string,

}

const UserNameButton:React.FC<UserNameButtonProps> = ({text}) => {

    const handleClick = async function(){
        try {
            const token =  localStorage.getItem("token")
            const user = await fetch(`https://recipeapp-22ha.onrender.com/getuser/${token}`)
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