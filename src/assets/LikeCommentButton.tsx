import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface LikeCommentButtonProps{
    _id:string
}

const LikeCommentButton:React.FC<LikeCommentButtonProps> = ({_id}) => {

    const style = {
        backgroundColor:'transparent',
        border:'none',
        zIndex:'10'
    }

    const clickHandle = async function(e:React.MouseEvent){
        try {
            e.stopPropagation()
            const response = await fetch(`http://localhost:2030/addliketocomment/${_id}`)
            if(!response.ok){
                throw Error('Problem with adding like to comment')
            }
        } catch (error) {
            
        }        


        console.log('Comment is Liked');     
    }

    return ( 
        <div className="like-button">
            <button onClick={(e)=>{clickHandle(e)}} style={style}><FontAwesomeIcon icon={faHeart} /></button>
        </div>
     );
}
 
export default LikeCommentButton;