import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons';

const TimeButton = () => {

    const style = {
        backgroundColor:'transparent',
        border:'none'
    }

    return ( 
        <div style={style} className="time-button">
            <i><FontAwesomeIcon icon={faClock}></FontAwesomeIcon></i>
        </div>
     );
}
 
export default TimeButton;