import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
interface PostId{
    postId:string
    userId: string
}
const BookmarkButton:React.FC<PostId> = ({postId, userId})=> {


    const handleBookmark = async (e:any) => {
        alert('this will be the bookmark button')
        try {
            const addBookmark = await fetch(`http://localhost:2030/addbookmark/${userId}`,{
                method:"PUT",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({id:postId})
            })
        } catch (error) {
            console.log(error)
        }
    }
    const style = {
        backgroundColor:'transparent',
        border:'none'
    }

    return ( 
        <div className='bookmark-button'>
            <button onClick={handleBookmark} style={style}><FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon></button>
        </div>
     );
}
 
export default BookmarkButton;