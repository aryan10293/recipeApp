import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const LikeButton = () => {

    const style = {
        backgroundColor:'transparent',
        border:'none'
    }

    return ( 
        <div className="like-button">
            <button style={style}><FontAwesomeIcon icon={faHeart} /></button>
        </div>
     );
}
 
export default LikeButton;