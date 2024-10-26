import { useEffect, useState } from "react";

interface SlidingButtonProps{
    btnClickHandle:()=>void,
    btnTextOnTheLeft:string,
    btnTextOnTheRight:string,
    isBtnOnTheLeft:boolean
}

const SlidingButton:React.FC<SlidingButtonProps> = ({btnClickHandle,btnTextOnTheLeft,btnTextOnTheRight,isBtnOnTheLeft}) => {



    const [btnClassName,setBtnClassName] = useState<string>("")
    const [btnText,setBtnText] = useState<string>('')
    const [btnTextClassName,setBtnTextClassName] = useState<string>("")

    const setClassName = function(){
        if(isBtnOnTheLeft){
            setBtnClassName('slide-btn slide-state-01')
            setBtnTextClassName('slide-btn-txt slide-btn-txt-state-01')
            setBtnText(btnTextOnTheLeft)
        }
        else{
            setBtnClassName('slide-btn slide-state-02')
            setBtnTextClassName('slide-btn-txt slide-btn-txt-state-02')
            setBtnText(btnTextOnTheRight)
        }
    }

    useEffect(()=>{
        setClassName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isBtnOnTheLeft])

    return (  
        <div className="slide-btn-container" >
            <div className="button-container">
                <button onClick={btnClickHandle} className={btnClassName}></button>
            </div> 
            <div style={{height:'0'}}>
                <p className={btnTextClassName} >{btnText}</p>
            </div>
        </div>
     );
}

export default SlidingButton;