import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const BookmarkButton = () => {

    const style = {
        backgroundColor:'transparent',
        border:'none'
    }

    return ( 
        <div className='bookmark-button'>
            <button style={style}><FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon></button>
        </div>
     );
}
 
export default BookmarkButton;