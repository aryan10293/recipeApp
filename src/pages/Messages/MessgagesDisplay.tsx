import React, { useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom'
import LikeMessage from './messageButtons/LikeMessage'
import convertBase64 from '../../drejfunctionhekeepsresuing/covertImage'
interface UserId{
    userId:string
}


 const MessgagesDisplay: React.FC<UserId> = ({userId}) =>  {
    const { id } = useParams();
    const [roomId, setRoomId] = useState<string | string[]>(``)
    const [messageToSend, setMessageToSend] = useState<string>('')
    const [messageHistory, setMessageHistory] = useState<any>([])
    const [measurement, setMeasurement] = useState<string>('')
    const [ingrident, setIngrident] = useState<string>('')
    
    // Getting History
   const getMessageHistory = async () => {
        const getMessages = await fetch(`https://recipeapp-22ha.onrender.com/getchatroommessages/${roomId}`, {
          method:'GET',
          headers: {'Content-Type': 'application/json'},
        })

        const messageHistory = await getMessages.json() 
        setMessageHistory(messageHistory.messages)
      }

    useEffect(() => {
        const ws = new WebSocket('wss://recipeapp-22ha.onrender.com');
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
          // console.log(`Message from server: ${event.data}`);
          getMessageHistory()
        };

        ws.onclose = () => {
          // console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
          // console.error('WebSocket error:', error);
        };

        getMessageHistory()

    }, [id, userId, roomId])

    // Sending the message
const sendMessage = async (e:any) => {
  let img = e.currentTarget.previousSibling.files[0]
  let base64:any = ''
  if(img !== undefined){
       base64 = await convertBase64(img)
  }
  const ws = new WebSocket('wss://recipeapp-22ha.onrender.com');
  ws.onopen = async () => {

      const message = {
        type:'message',
        message:messageToSend,
        senderId:userId,
        recieverId:id,
        chatRoomId: roomId,
        imgString: base64
      }

      const sendMessagetoDatabase = await fetch(`https://recipeapp-22ha.onrender.com/createmessage`,{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(message)
      })

      const messageFromDatabase = await sendMessagetoDatabase.json()

      if(messageFromDatabase.status === '200'){
        ws.send(JSON.stringify(message))
        getMessageHistory() 
      } else {
        // console.log(messageFromDatabase.message)
      }

    };

  ws.onmessage = (event) => {
    // i dont think this does anything
      // console.log(`Message from server:`, event.data);
    }
}

  return (
    <div style={{color:'black'}}>
        {id === undefined ? 'open a message to the left' : `${userId} and ${id}`}
        <textarea  onChange={(e:any) => setMessageToSend(e.target.value)} />
        <span>add a image</span>
        <input type="file" />
        <button onClick={sendMessage}>send message</button>

        <div>
          this is where message will go
          <ul>
              {
                messageHistory.map((x:any) => {
                 return  x.senderId === id ?  (
                      <li>this message will be on the left side {x.message} <LikeMessage apiCall='like' text='like' id={x._id}/> <LikeMessage text='heart' apiCall="heart" id={x._id} /><LikeMessage apiCall='dislike' text='dislike' id={x._id}/> <LikeMessage text='!!' apiCall='emphasize' id={x._id}/> <LikeMessage apiCall='question' text='?' id={x._id}/> <LikeMessage text='laugh' apiCall='laugh' id={x._id}/></li>
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
