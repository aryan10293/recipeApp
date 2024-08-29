import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCakeCandles } from '@fortawesome/free-solid-svg-icons';

const DifficultyIcon = () => {

    const style = {
        backgroundColor:'transparent',
        border:'none'
    }

    return ( 
        <div className='difficulty-icon'>
            <button style={style}><FontAwesomeIcon icon={faCakeCandles}></FontAwesomeIcon></button>
        </div>
     );
}
 
export default DifficultyIcon;