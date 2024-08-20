import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


const SavedRecipesButton = () => {
    return ( 
        <div className='nav-btn'>
            <Navbar/>
            <Link to={"/savedrecipes"}><button><FontAwesomeIcon icon={faBook} /></button></Link>
        </div>
     );
}

export default SavedRecipesButton;