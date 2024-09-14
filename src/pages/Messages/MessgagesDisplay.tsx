import React, { useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom'
interface UserId{
    userId:string
}
 const MessgagesDisplay: React.FC<UserId> = ({userId}) =>  {
    const { id } = useParams();
    const [roomId, setRoomId] = useState<string | string[]>(``)
    const [messageHistory, setMessageHistory] = useState<any>([])
    // if(id !== undefined){
    //   setRoomId(`${userId.slice(-4)}${id.slice(-4)}`) 
    // }
   
    useEffect(() => {
      const ws = new WebSocket('ws://localhost:2040');
    // Create a new WebSocket connection
    if(id !== undefined){
      setRoomId(`${userId.slice(-4)}${id.slice(-4)}`.split('').sort().join(''))
    }

    // Handle the 'open' event 
       ws.onopen = () => {
        console.log('Connected to WebSocket server');
        console.log('roomId:', roomId)
        ws.send(JSON.stringify({
          content: `user ${userId} joined the chat room ${roomId}`,
          chatRoomId: roomId,
          type:'join',
          userId: userId
        }));
      }; 
    ws.onmessage = (event) => {
      console.log(event)
      console.log(`Message from server: ${event.data}`);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

}, [id, userId, roomId])
const sendMessage = async () => {
  alert('w jfhbkr')
const ws = new WebSocket('ws://localhost:2040');
  ws.onopen = () => {
    const message = {
      message:'hey does this work',
      to:'lebron',
      from:'james'
    }
    ws.send(JSON.stringify(message))
    };
  ws.onmessage = (event) => {
      console.log(event)
      console.log(`Message from server: ${event.data}`);
    };
}

  return (
    <div style={{color:'black'}}>
        {id === undefined ? 'open a message to the left' : `${userId} and ${id}`}

        <button onClick={sendMessage}>send message</button>
    </div>
  ) 
}

export default MessgagesDisplay

// const addToMessages = async(e:any) => {
//         try {
//              await fetch(`https://lockerroom2-0.onrender.com/addtomessages/${id}`, {
//             method: 'PUT',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({id: user?._id, userName: user?.userName, messagingName: profile?.userName,roomId: messagingId+userMessagingId})
//             });
//         } catch (error) {
//             console.error(error)
//         }
//     }