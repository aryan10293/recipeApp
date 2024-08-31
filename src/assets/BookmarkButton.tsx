import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const BookmarkButton = () => {

    const style = {
        backgroundColor:'transparent',
        border:'none',
        margin:'0 0 0 15px'
    }

    return ( 
        <div className='bookmark-button'>
            <button onClick={(e)=>{e.stopPropagation()}} style={style}><FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon></button>
        </div>
     );
}
 
export default BookmarkButton;