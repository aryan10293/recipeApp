import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const LikeButton = () => {

    const style = {
        backgroundColor:'transparent',
        border:'none',
        zIndex:'10'
    }

    const clickHandle = function(e:React.MouseEvent){
        e.stopPropagation()
        console.log('Liked');
        
        
    }

    return ( 
        <div className="like-button">
            <button onClick={(e)=>{clickHandle(e)}} style={style}><FontAwesomeIcon icon={faHeart} /></button>
        </div>
     );
}
 
export default LikeButton;