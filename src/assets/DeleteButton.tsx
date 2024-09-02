import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
interface postId{
    postId:string 
}
const DeleteButton:React.FC<postId> = ({postId})=> {

    const style = {
        backgroundColor:'transparent',
        border:'none',
        zIndex:'10'
    }

    const clickHandle = async (e:React.MouseEvent) => {
        e.stopPropagation()
        const getPost = await fetch(`http://localhost:2030/deletepost/${postId}`,{
            method:"DELETE",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({})
        })
        const postInfo = await getPost.json()
        if(postInfo.status === '400'){
            alert(postInfo.message)
        } else if (postInfo.status === '200') {{
            alert(postInfo.message)
            window.location.reload()
        }}
    }
    return ( 
        <div className="delete-button">
            <button onClick={(e)=>{clickHandle(e)}} style={style}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
     );
}
 
export default DeleteButton;