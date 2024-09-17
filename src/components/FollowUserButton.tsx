import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faPersonWalking,faPersonWalkingArrowLoopLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';

interface followUserButtonProps{
    personToFollow: string,
    followClass?:string
}

const FollowUserButton:React.FC<followUserButtonProps> = ({personToFollow,followClass}) => {

    const followUserButtonStyle:React.CSSProperties = {
        backgroundColor:'transparent',
        position:'relative',
        transform:'scale(1.1)'
    } 

    const [pending,setPending] = useState<boolean>()
    const userId:string|null = useContext(UserContext)
    
    const [isFollowed,setIsFollowed] = useState<boolean>()

    // Setting the payload for following
    const payload:{} = {
        personToFollow: userId
    }

    // Check if the owner of the post is followed or not
    const checkIfPersonIsFollowed = async function(){
        const response = await fetch(`http://localhost:2030/getuserbyid/${userId}`)
        const userData =  await response.json()
        const followedUsersList:string[] = userData.user[0].followings
        const isItFollowed = followedUsersList.includes(personToFollow)

        if(isItFollowed){
            setIsFollowed(true)
        }
        else{
            setIsFollowed(false)
        }

        return isItFollowed;
    }

    useEffect(()=>{
        checkIfPersonIsFollowed()
    },[])

    //Unfollow user logic
    const unfollowUser = async function(){
        try {               
            setPending(true)
            console.log(userId,' is following ',payload);
    
            const response = await fetch(`http://localhost:2030/unfollow/${personToFollow}`,{
                method: 'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(payload)
            })
            console.log(response);
            
            if(!response.ok){
                throw new Error('Error while unfollowing user')
            }

            const data = await response.json()
            console.log('User successfully unfollowed!',data);
            alert(`User is unfollowed!`)
            setPending(false)

        } catch (error) {
            console.log('Issue while unfollowing user',error); 
        }
    }

    // Follow user logic
    const followUser = async function(){
        try {               
            setPending(true)
            console.log(userId,' is following ',payload);
    
            const response = await fetch(`http://localhost:2030/follow/${personToFollow}`,{
                method: 'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(payload)
            })
            console.log(response);
            
            if(!response.ok){
                throw new Error('Error while following user')
            }

            const data = await response.json()
            console.log('User successfully followed!',data);
            alert(`User is followed!`)
            setPending(false)

        } catch (error) {
            console.log('Issue while following user',error); 
        }
    }

    // Follow button click handling
    const handleClick = async function(e:React.MouseEvent){
        e.stopPropagation()
        const isUserFollowed = await checkIfPersonIsFollowed()
        console.log(isUserFollowed)
        if(isUserFollowed){
            await unfollowUser()
            setIsFollowed(false)
            // console.log("Unfollowing User");
            
        }
        else{
            await followUser()
            setIsFollowed(true)
            // console.log("Following User");
        }
    }

    const renderIcon = function(){
        return (
            isFollowed ?  <><FontAwesomeIcon style={followUserButtonStyle} icon={faPersonWalkingArrowLoopLeft}></FontAwesomeIcon> <p style={{margin:0,fontSize:'0.6rem',textTransform:'uppercase',color:'white',fontWeight:'500'}}>Unfollow</p></> : <><FontAwesomeIcon style={followUserButtonStyle} icon={faPersonWalking}></FontAwesomeIcon><p style={{margin:0,fontSize:'0.5rem',textTransform:'uppercase',color:'white',fontWeight:'500'}}>Follow</p></> 
        )
    } 

    return ( 
        <button className={followClass} onClick={(e)=>handleClick(e)}>
            {/* {pending ? <p>Loading</p> : <FontAwesomeIcon icon={faPersonWalking}></FontAwesomeIcon>} */}
            {pending ? <p className='pending-msg'>Loading...</p> : renderIcon()}
        </button>
     );
}
 
export default FollowUserButton;