import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';


const SearchButton = () => {
    return ( 
        <div className='nav-btn'>
            <Link to={"/search"}><button><FontAwesomeIcon icon={faSearch} /></button></Link>
        </div>
     );
}
 
export default SearchButton;