import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

    interface SignOutButton{
        margin:string,    
    }

const SignOutButton:React.FC<SignOutButton> = ({margin}) => {

    const style = {
        backgroundColor:'transparent',
        border:'none',
        zIndex:'10',
        margin:`${margin}`,
        color:'#f8f5f2'
    }

    const navigate = useNavigate()

    const handleClick = function(){
        localStorage.removeItem('token')
        navigate('/login')
        
    }

    return ( 
    <div className="like-button" style={{display:'flex',flexDirection:'row'}}>
        {<button onClick={handleClick} style={style}><FontAwesomeIcon icon={faArrowRightFromBracket} /></button>}
    </div>
     );
}

export default SignOutButton;