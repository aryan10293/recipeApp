import React, { KeyboardEventHandler } from 'react';
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";

interface Message{
    message:string | null,
    senderId: string | null,
    recieverId: string | undefined
    chatRoomId:string,
    type:string,
    imgString:string
}

interface User{
    userName: string,
    _id:string,
    profilePic:string
}



const MessageContainer2 = () => {

    const userId = useContext(UserContext) as string | null
    const [chatHistory,setChatHistory] = useState<Message[]>([])
    const [typedMessage,setTypedMessage] = useState<string>("")
    const [roomId,setRoomId] = useState<string>("")
    const [users,setUsers] = useState<User[]>([])
    const [ws,setWs] = useState<WebSocket>()
    const [receiverId,setReceiverId] = useState<string>("")
    
    // variables needed to search for users
    let timeout: NodeJS.Timeout;             
    let doneTypingInterval = 1000; 


    // Getting users
    const getUsers = async function name() {
        const response = await fetch('https://recipeapp-22ha.onrender.com/getusers')
        const data = await response.json()
        const userArray:User[] = data.users
        setUsers(userArray)
    }

    // Generating room id
    const createRoomId = function(id:string){   
        if(userId && id){
            const generatedRoomId:string = (id.slice(-4)+userId.slice(-4)).split("").sort().join("")
            setRoomId(generatedRoomId)
            console.log('generatedRoomId:',generatedRoomId);
            return generatedRoomId
        }
        else{
            console.log('No user ID found')
        }
    }

   // Getting chat history array
    const getChatHistory = async (id:string) => {
        const response = await fetch(`https://recipeapp-22ha.onrender.com/getchatroommessages/${id}`)
        const data = await response.json()
        setChatHistory(data.messages)
    }

    //  Printing chat history
    // const printChatHistroy = function(){
    //     return(
    //         chatHistory && chatHistory.map((message,index)=>(
    //             <div key={index}>
    //                 <li style={{color:'black'}}>{message.message}</li>
    //             </div>
    //         ))
    //     )
    // }

    // Clicking user card
    const clickingUserCard = async function(usersId:string){
        const ID:string | undefined = createRoomId(usersId)
        setReceiverId(usersId)
        console.log('Receiver ID',ID);
        if(ID){
            getChatHistory(ID)  
        }
    }

    // Clicking send button logic
    const sendMessage = async function(){
        if(ws && ws.readyState === WebSocket.OPEN){
            console.log('Sending message',typedMessage);
            


            ws.send(JSON.stringify({
                message: typedMessage,
                chatRoomId: roomId,
                type:'message',
                userId: userId,
                recieverId: receiverId
              }));

              console.log('Message sent: ',typedMessage);

              setTypedMessage('')

              const response = await fetch(`https://recipeapp-22ha.onrender.com/createmessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  message: typedMessage,
                  chatRoomId: roomId,
                  type:'message',
                  senderId: userId,
                  recieverId: receiverId
                })
              })
              const data = await response.json()
              console.log(data);
            //   await getChatHistory(roomId)
        }
        else{
            console.log('Connection is not open');
        }
    }

    // search for users we have already chatted with
    const testing: KeyboardEventHandler<HTMLInputElement> = (e) => {
        clearTimeout(timeout)
        const inputValue = (e.target as HTMLInputElement).value.trim()
         const findUser = async () => {
            const getUsers = await fetch(`https://recipeapp-22ha.onrender.com/searchforusers`, {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({search: inputValue, id:userId})
            })
            const searchedUsers = await getUsers.json()
            console.log(searchedUsers)
            // setUsers(searchedUsers.data)
        }
        //console.log(e.target.textContent)
        timeout = setTimeout(async() => {
             findUser()
        }, doneTypingInterval)
    }

    useEffect(()=>{
        getUsers()
        const wss = new WebSocket('https://recipeapp-22ha.onrender.com')
        setWs(wss)
        wss.onopen = (event)=>{
            wss.send(JSON.stringify({
                content: `user ${userId} joined the chat room ${roomId}`,
                chatRoomId: roomId,
                type:'join',
                userId: userId
              }));
            console.log('Socket is open');
        }

        wss.onerror = (error)=>{
            console.log('Websocket error ',error);      
        }

        wss.onmessage = async (event) => {
            try {
                const message = event.data
                console.log(message);
                setChatHistory((prevChatHistory) => [...prevChatHistory, message]); // Pushing message to chat history
                await getChatHistory(roomId) // Getting chat history
            } catch (error) {
                console.log(error);
                
            }
        }

        wss.onclose = (event)=>{
            console.log('Connection is closed');
        }
    },[roomId,userId,receiverId])

    return ( 
        <div>
            <div>
                <h3>search for messages</h3>
                <input type="text" onKeyUp={testing}/>
            </div>
            {users &&  users.map((user:User)=>(
                < div key={user._id}>
                    <button onClick={(e)=>clickingUserCard(user._id)}>{user.userName}</button>                    
                </div>
            ))}
            {/* {chatHistory && printChatHistroy()} */}
            {chatHistory && chatHistory.map((message,index)=>(
                                <div key={index}>
                                    <li style={{color:'black'}}>{message.message}</li>
                                </div>
                            ))}
            <input value={typedMessage} onChange={(e)=>setTypedMessage(e.target.value)} type="text" name="" id="" />
            <button onClick={(e)=>sendMessage()}>Send</button>
        </div>
     );
}
 
export default MessageContainer2;