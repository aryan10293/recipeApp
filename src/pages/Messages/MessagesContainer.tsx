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
    type:string,
    imgString:string
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
    const [isConnected,setIsConnected] = useState<boolean>(false)
    

    // Socket Handling    
    useEffect(() => {
        const socketHandle = function(){
        
        const ws = new WebSocket('ws://localhost:2040')
        setWss(ws)

        ws.onopen = (event)=>{
            console.log('Socket is open')
            const message = JSON.stringify({type:'connect',message:'Hello server',roomId:roomId})
            console.log('Sending message to the websocket server: ',message)
            ws.send(JSON.stringify({
                content: `user ${userId} joined the chat room ${roomId}`,
                chatRoomId: roomId,
                type:'join',
                userId: userId
              }));
              setIsConnected(true)
              getMessageHistory(roomId)
        }

        ws.onmessage = async (event) => {
            const message = event.data
            setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
            console.log('New message received: ',message);
            
            await getMessageHistory(roomId)
        };

        ws.onerror = (error)=>{
            console.log('Websocket error ',error);
        }


        ws.onclose = ()=>{
            console.log('Connection is closed');    
        }
        return ()=>{
            if(ws){
                ws.close()  
            }
        }        
    }
    socketHandle()
    }, [partnerId,userId,roomId])
    
    // const roomIdRef = useRef(roomId)
    useEffect(()=>{
        // if(roomIdRef.current !== roomId){
        //     getMessageHistory(roomId)
        //     roomIdRef.current = roomId
        // }
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
            const response = await fetch(`http://localhost:2030/getchatroommessages/${chatRoomId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            
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
                roomId && chatHistory && chatHistory.map((message,index)=>(
                    <ul className="message-card" key={index}>
                        {message.senderId === userId ? <li className="sent">{message.message}</li> : <li className="received">{message.message}</li>}
                    </ul>
                ))
        )
    }
 

    // Clicking Send Button Logic
    const handleSendMessageClick = async () => {
        console.log('handleSendMessageClick called');
        console.log('wss:', wss);   

        if(!wss || wss.readyState !== WebSocket.OPEN){
            console.log('wss is not yet set or not open')
            return;
        }

        if (!messageToSend.trim()) return; 
    
        const payload: Message = {
            type: 'message',
            message: messageToSend,
            senderId: userId,
            recieverId: partnerId,
            chatRoomId: roomId,
            imgString: '',
        };
    
        try {
    
            const response = await fetch(`http://localhost:2030/createmessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error('Error while sending message');
            }
            if (isConnected && wss && wss.readyState === WebSocket.OPEN) {
                console.log('Sending message:', payload);
                wss.send(JSON.stringify(payload));
                console.log('wss:', wss,'Sent');    
            }
            const jsonResponse = await response.json()
            setMessage('');
            // console.log('response: ',jsonResponse);
            
            await getMessageHistory(roomId)
        } catch (error) {
            console.error(error);
        }
    };

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
                        {/* {roomId && chatHistory && chatHistory.map((message,index)=>(
                            <ul className="message-card" key={index}>
                                {message.senderId === userId ? <li className="sent">{message.message}</li> : <li className="received">{message.message}</li>}
                            </ul>
                        ))} */}
                        {chatHistory &&  printMessageHistory()}
                    </div>
                </div>
                <div className="message-input">
                        <textarea value={messageToSend} onChange={(e)=>setMessage(e.target.value)} ></textarea>
                        <button onKeyDown={(e)=>e.key === 'Enter' && handleSendMessageClick()}  onClick={(e)=>handleSendMessageClick()}>Send</button>
                </div>

            </div>
        </div>
     );
}
 
export default MessagesContainer;