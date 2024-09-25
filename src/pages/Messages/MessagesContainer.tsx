import { useContext, useEffect, useRef, useState } from "react";
import Header from "../../assets/Header";
import ProfileIcon from "../../assets/ProfileIcon";
import useGetUserDataFromId from "../../Utils/useGetUserDataFromId";
import UserIcons from "./UserIcons";
import { faEtsy } from "@fortawesome/free-brands-svg-icons";
import UserContext from "../../contexts/UserContext";
import RecipeItem from "../../components/RecipeItem";

interface User{
    userName: string,
    _id:string,
    profilePic:string
}
interface Message{
    message:string | null,
    senderId: string | null,
    recieverId: string | undefined
    chatRoomId:string,
    type:string
}

const MessagesContainer = () => {
    const {userUsername:userUserName,userProfilePicture:userProfilePicture} = useGetUserDataFromId('66c9d11243289e296cd8d128')
    const userId = useContext(UserContext) as string | null
    const [chatHistory,setChatHistory] = useState<Message[]>([])
    const [partnerId,setPartnerId] = useState<string>("")
    const [roomId,setRoomId] = useState<string>("")
    const [users,setUsers] = useState([])
    const [messageToSend,setMessage] = useState<string>("")
    const [wss,setWss] = useState<WebSocket>()
    

    // Socket Handling    
    useEffect(() => {
        const socketHandle = function(){
        
        const ws = new WebSocket('ws://localhost:2040')
        setWss(ws)

        ws.onopen = ()=>{
            console.log('Socket is open')
            getMessageHistory(roomId)
            ws.send(JSON.stringify({type:'connect',message:'Hello server'}))
        }

        ws.onmessage = (event)=>{
            const receivedMessage = JSON.parse(event.data)
            console.log('Received message: ',receivedMessage);
            
            // setChatHistory((prevChatHistory)=>[...prevChatHistory,receivedMessage])
            setChatHistory(prevChatHistory => [...prevChatHistory, receivedMessage]);

        }

        ws.onerror = (error)=>{
            console.log('Websocket error ',error);
        }

        ws.onclose = ()=>{
            console.log('Connection is closed');    
        }
        }     
        socketHandle()
        return ()=>{
            if(wss){
                wss?.close()  
            }
    }

    }, [])
    
    useEffect(()=>{
        getMessageHistory(roomId)
        generateUser()
    },[roomId])
    
    useEffect(()=>{
        createRoomId(partnerId)
        console.log('Room ID',roomId)

    },[partnerId,userId,roomId])

    // Getting users
    const generateUser = async () => {
        const getUsers = await fetch(`http://localhost:2030/getusers`, {
            method:'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const idkwhattocallthis = await getUsers.json()
        setUsers(idkwhattocallthis.users)
        console.log(idkwhattocallthis);    
    }

    // Selecting user to chat with
    const clickingUserCard = function(usersId:string){
        setPartnerId(usersId)
        console.log(usersId);          
    }

    // Printing chat user list
    const printingUsernames = function(){
        return(
            <div>
                {users?.map((user:User)=>(
                    <div key={user._id}>
                        <button onClick={(e)=>clickingUserCard(user._id)} className="user-msg-btn"><UserIcons userName={user.userName} userProfilePic={user.profilePic} /></button>
                    </div>))}
            </div>
        )
    }

    // Generate room ID
    const createRoomId = function(id:string){   
        if(userId && id){
            const generatedRoomId = (id.slice(-4)+userId.slice(-4)).split("").sort().join("")
            setRoomId(generatedRoomId)
        }
        else{
            console.log('No user ID found')
        }
    }

    // Getting message history
    const getMessageHistory = async function(chatRoomId:string){
        try {
            const response = await fetch(`http://localhost:2030/getchatroommessages/${chatRoomId}`)
            
            if(!response.ok){
                throw Error('Error while fetching chat history')
            }

            const history = await response.json()
            
            setChatHistory(history.messages)
            
            
        } catch (error) {
            console.log('Error while getting chat history',error); 
        }
    }

    // Printing Message History
    const printMessageHistory = function(){
       
           return (
                chatHistory.map((message:Message,index)=>(
                    <div className="message-card" key={index}>
                        <p>{message.message}</p>
                    </div>
                ))
            )
    }


    // Clicking Send Button Logic
    const handleSendMessageClick = async function(){
        if(!messageToSend.trim()) return;
        const payload:Message = {
            type:'message',
            message:messageToSend,
            senderId: userId,
            recieverId: partnerId,
            chatRoomId:roomId,
            }
             
            console.log('wss',wss)  
            
            if(wss && wss.readyState === WebSocket.OPEN){
                wss.send(JSON.stringify(payload))
                console.log('Message is sent via websocket',payload);     
 
            }
            else{
                console.error('Websocket is not open')
            }
            // getMessageHistory(roomId)
            setMessage("")
        try {
           const response = await fetch(`http://localhost:2030/createmessage`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)
           })
           if(!response.ok){
            throw Error('Error while sending message')
           }

           const serverJson = response.json()
           console.log(serverJson);
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <div className="messages-container">
            <div className="messages-users-list-container">
                {users && printingUsernames()}
            </div>
            <div className="messages-current-chat">

                <div className="messages-current-chat-header">
                    <UserIcons userName={userUserName} userProfilePic={userProfilePicture} />
                </div>
                <div className="messages-current-chat-chatter">
                    <div className="messages-current-chat-chatter-message-card">
                        { chatHistory && chatHistory.map((message,index)=>(
                            <div className="message-card" key={index}>
                                <p>{message.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="message-input">
                        <textarea value={messageToSend} onChange={(e)=>setMessage(e.target.value)} ></textarea>
                        <button  onClick={(e)=>handleSendMessageClick()}>Send</button>
                </div>

            </div>
        </div>
     );
}
 
export default MessagesContainer;