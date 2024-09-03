import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from './useFetch';
import React from 'react';

interface bookmarkButtonProps{
    postId:string
}

const BookmarkButton:React.FC<bookmarkButtonProps> = ({postId}) => {

    const style = {
        backgroundColor:'transparent',
        border:'none',
        margin:'0 0 0 15px',
        color:'#f8f5f2'
    }




    const handleClick = async function(e:React.MouseEvent){
        try {
            e.stopPropagation()
            const response = await fetch(`http://localhost:2030/bookmark/${postId}`,
                {
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    
                }
            )
            const data = await response.json()
            console.log(data)

        } catch (error) {
            console.log(error)
        }

        
    }

    return ( 
        <div className='bookmark-button'>
            <button onClick={(e)=>{handleClick(e)}} style={style}><FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon></button>
        </div>
     );
}
 
export default BookmarkButton;