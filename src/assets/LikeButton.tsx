import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

interface PostLikeButtonProps{
    postId: string
}

const LikeButton:React.FC<PostLikeButtonProps> = ({postId}) => {

    const style = {
        backgroundColor:'transparent',
        border:'none',
        zIndex:'10'
    }

    const [userID,setUserID] = useState<string>("")

    const getUsersId = async function(){
        try {
            const token =  await localStorage.getItem("token")
            const user = await fetch(`http://localhost:2030/getuser/${token}`)
            const userData = await user.json()
            const fetchedUserID = await userData.userinfo[0]._id
            setUserID(fetchedUserID)   
            return fetchedUserID
            
        } catch (error) {
            console.log('Could not get userId for comment posting',error)
        }
    }





    const clickHandle = async function(e:React.MouseEvent){
        try {
            e.stopPropagation()
            const currentUserID = await getUsersId()
            if(!currentUserID){
                throw new Error('current user id is not present')
            }
            
            const addLikeToPostBody = {
                userId:currentUserID,
            }

            console.log('User ID :',currentUserID );
            console.log('Payload to like comment: ',addLikeToPostBody);
            console.log('Post ID:',postId)

            const response = await fetch(`http://localhost:2030/addliketopost/${postId}`,
                {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(addLikeToPostBody)
                }
            )

            if(!response.ok){
                throw new Error('Issue with liking post')
            }

            const data = await response.json()

            console.log('Success!',data)
        } catch (error) {
            console.log('Failed!',error)
        }
        
    }

    return ( 
        <div className="like-button">
            <button onClick={(e)=>{clickHandle(e)}} style={style}><FontAwesomeIcon icon={faHeart} /></button>
        </div>
     );
}
 
export default LikeButton;