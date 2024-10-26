import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface IconProps{
    style?:React.CSSProperties
}

const DifficultyIcon:React.FC <IconProps>= ({style}) => {

    // const style = {
    //     backgroundColor:'transparent',
    //     border:'none'
    //     }
    

    return ( 
        <div className='difficulty-icon mr-1'>
            <button style={style}><FontAwesomeIcon icon={faFire}></FontAwesomeIcon></button>
        </div>
     );
}
 
export default DifficultyIcon;