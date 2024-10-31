import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

    interface CommentButtonProps{
        handle:(e:React.MouseEvent<HTMLButtonElement>)=>void;
        margin:string,
        numberOfComments:number | undefined | null
        
    }

const CommentButton:React.FC<CommentButtonProps> = ({handle,margin,numberOfComments}) => {

    const style = {
        backgroundColor:'transparent',
        border:'none',
        zIndex:'10',
        margin:`${margin}`,
        color:'#f8f5f2'
    }


    return ( 
    <div className="like-button flex flex-row justify-between">
        {<button onClick={(e)=>handle(e)} style={style}><FontAwesomeIcon icon={faComment} /></button>}
        <p>{numberOfComments}</p>
    </div>
     );
}

export default CommentButton;