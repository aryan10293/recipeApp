import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MessageButton = () => {
    return ( 
        <div className='nav-btn'>
            <Link to={"/messages"}><button><FontAwesomeIcon icon={faMessage}/></button></Link>
        </div>
     );
}
 
export default MessageButton;