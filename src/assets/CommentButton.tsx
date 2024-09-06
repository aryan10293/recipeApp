import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

    interface CommentButtonProps{
        handle:(e:React.MouseEvent<HTMLButtonElement>)=>void;
        margin:string
        
    }




const CommentButton:React.FC<CommentButtonProps> = ({handle,margin}) => {

    const style = {
        backgroundColor:'transparent',
        border:'none',
        zIndex:'10',
        margin:`${margin}`
    }

    return ( 
        <div className="like-button">
        <button onClick={(e)=>handle(e)} style={style}><FontAwesomeIcon icon={faComment} /></button>
    </div>
     );
}

export default CommentButton;