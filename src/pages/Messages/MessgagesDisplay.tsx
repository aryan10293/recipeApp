import React, { useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom'
interface UserId{
    userId:string
}
 const MessgagesDisplay: React.FC<UserId> = ({userId}) =>  {
    const { id } = useParams();
    const [roomId, setRoomId] = useState<string | string[]>(``)
    const [messageToSend, setMessageToSend] = useState<string>('')
    const [messageHistory, setMessageHistory] = useState<any>([])
   
    const getMessageHistory = async () => {
        const getMessages = await fetch(`http://localhost:2030/getchatroommessages/${roomId}`, {
          method:'GET',
          headers: {'Content-Type': 'application/json'},
        })

        const messageHistory = await getMessages.json()
        
        setMessageHistory(messageHistory.messages)
      }

    useEffect(() => {
      const ws = new WebSocket('ws://localhost:2040');
      if(id !== undefined){
        setRoomId(`${userId.slice(-4)}${id.slice(-4)}`.split('').sort().join(''))
      }
  
       ws.onopen = (event) => {
        ws.send(JSON.stringify({
          content: `user ${userId} joined the chat room ${roomId}`,
          chatRoomId: roomId,
          type:'join',
          userId: userId
        }));
      }; 
      
    ws.onmessage = (event) => {
      console.log(`Message from server: ${event.data}`);
      getMessageHistory()
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

      getMessageHistory()

}, [id, userId, roomId])

const sendMessage = async () => {
const ws = new WebSocket('ws://localhost:2040');
console.log(ws)
  ws.onopen = async () => {

      const message = {
        type:'message',
        message:messageToSend,
        senderId:userId,
        recieverId:id,
        chatRoomId: roomId,
      }

      const sendMessagetoDatabase = await fetch(`http://localhost:2030/createmessage`,{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(message)
      })

      const messageFromDatabase = await sendMessagetoDatabase.json()

      if(messageFromDatabase.status === '200'){
        ws.send(JSON.stringify(message))
        getMessageHistory() 
      } else {
        console.log(messageFromDatabase.message)
      }

    };

  ws.onmessage = (event) => {
    // i dont think this does anything
      console.log(`Message from server:`, event.data);
    };
}

  return (
    <div style={{color:'black'}}>
        {id === undefined ? 'open a message to the left' : `${userId} and ${id}`}
        <textarea  onChange={(e:any) => setMessageToSend(e.target.value)} />
        <button onClick={sendMessage}>send message</button>

        <div>
          this is where message will go
          <ul>
              {
                messageHistory.map((x:any) => {
                 return  x.senderId === id ?  (
                      <li>this message will be on the left side {x.message}</li>
                  ) :  (
                     <li>this message will be on the right side {x.message}</li>
                  )
                })
              }
          </ul>
        </div>
    </div>
  ) 
}

export default MessgagesDisplay
