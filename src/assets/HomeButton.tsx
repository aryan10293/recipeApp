import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const HomeButton = () => {
    return ( 
        <div className='nav-btn'>
            <Link to={"/home"}><button><FontAwesomeIcon icon={faHouse} /></button></Link>
        </div>
     );
}
 
export default HomeButton;