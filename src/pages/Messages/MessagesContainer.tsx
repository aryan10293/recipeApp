import { useContext, useEffect, useRef, useState } from "react";
import useGetUserDataFromId from "../../Utils/useGetUserDataFromId";
import UserIcons from "./UserIcons";
import UserContext from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import useQueryFetch from "../../Utils/Api/useQueryFetch";

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
interface Props{
    receiverId:string
}



const MessagesContainer = () => {

    const userId = useContext(UserContext) as string | null
    const [chatHistory,setChatHistory] = useState<Message[]>([])
    const [partnerId,setPartnerId] = useState<string>("")
    const {userUsername:userUserName,userProfilePicture:userProfilePicture} = useGetUserDataFromId(partnerId)
    // const {data,error,isPending} = useQueryFetch('http://localhost:2030/getuser/')

    const [roomId,setRoomId] = useState<string>("")
    const [users,setUsers] = useState([])
    const [messageToSend,setMessage] = useState<string>("")
    const [wss,setWss] = useState<WebSocket>()
    const [isConnected,setIsConnected] = useState<boolean>(false)
    
    const receiverId = useParams()

    const chatBoxRef:any = useRef(null)

     // variables needed to search for users
    let timeout: NodeJS.Timeout;             
    let doneTypingInterval = 1000; 

    // Socket Handling    
    useEffect(() => {
        if(chatBoxRef.current){
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
        }
        const socketHandle = function(){
        
        const ws = new WebSocket('wss://recipeapp-22ha.onrender.com')
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
            console.log('Websocket error ','this shit hella weak',error);
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

    
    createRoomId(partnerId)
    socketHandle()
    console.log('partnerId',partnerId);
    
    }, [partnerId,roomId])

    useEffect(()=>{
        if (receiverId.id) {
            setPartnerId(receiverId.id);
        }
        console.log('ReceiverId is: ',receiverId.id);
        
    },[])

    // Getting users
        useEffect(() => {
            const lol = async () => {
                const getMessagedUserHistory = await fetch(`https://recipeapp-22ha.onrender.com/getuserchathistory`, {
                    method:'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id:userId})
                })
                    const jsonGetMessagedUserHistory = await getMessagedUserHistory.json()
                    setUsers(jsonGetMessagedUserHistory.chatHistory)
                    // setUsers(jsonGetMessagedUserHistory.chatHistory.map((x:any) =>  x[0]))
                    // console.log('hello')
                }
            lol()
        }, [userId])
console.log(users.map((x:any) => x[0]))
    // Selecting user to chat with
    const clickingUserCard = function(usersId:string){
        setPartnerId(usersId)
        console.log(usersId,userId,'looking for this');         
    }

    // Printing chat user list
    const printingUsernames = async function(){
        return(
            <div className="lol">
                {users?.map((user:any)=>(
                    <div key={user._id}>
                        <button  onClick={(e)=>clickingUserCard(user[0]._id)} className={ `user-msg-btn`}><UserIcons userName={user[0].userName} userProfilePic={user[0].profilePic} /></button>
                    </div>))}
            </div>
        )
    }

    // Generate room ID
    const createRoomId = function(id:string){
        if(id){
            if(id.length > 0){
                if(userId && id){
                    const generatedRoomId = (id.slice(-4)+userId.slice(-4)).split("").sort().join("")
                    setRoomId(generatedRoomId)
                } else {
                    console.log('No user ID found')
                }
            }
        }   
        else{
            console.log('No Id Found');
            
        }

    }

    // Getting message history
    const getMessageHistory = async function(chatRoomId:string){
        if (chatRoomId.length > 0){
            try {
                    const response = await fetch(`https://recipeapp-22ha.onrender.com/getchatroommessages/${chatRoomId}`, {
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
    }

    // Printing Message History
    const printMessageHistory = function(){
       
        return ( chatHistory !== null ? 
                roomId && chatHistory && chatHistory.map((message,index)=>(
                    <ul className="message-card" key={index}>
                        {message.senderId === userId ? <li className="sent">{message.message}</li> : <li className="received">{message.message}</li>}
                    </ul>
                )) : <p className="pending-msg">Loading...</p>
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
    
            const response = await fetch(`https://recipeapp-22ha.onrender.com/createmessage`, {
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
            
            await getMessageHistory(roomId)
        } catch (error) {
            console.error(error);
        }
    };

    // search for message feature
    const testing = (e:any) => {
        clearTimeout(timeout)
         const findUser = async () => {
            const getUsers = await fetch(`https://recipeapp-22ha.onrender.com/searchforusers`, {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({search: e.target.value, id:userId})
            })
            const searchedUsers = await getUsers.json()
            // setUsers(searchedUsers.searchedUsers.map((x:any) =>  x[0]))
            console.log(searchedUsers);
            setUsers(searchedUsers.searchedUsers)                 
        }

        timeout = setTimeout(async() => {
             findUser()
        }, doneTypingInterval)
    }

    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, [chatHistory]); 
    return ( 
        <div className="messages-container">
            <div className="w-1/4 flex flex-col overflow-auto">
                <h4 className="text-md capitalize mb-1">search for messages</h4>
                <input className="bg-white w-[90%] mb-2 rounded-sm p-1 text-md" type="text" onKeyUp={testing} />
                {   userId &&
                    users !== undefined && users?.map((user:any,index)=>(
                    <div key={index}>
                        <button onClick={(e)=>clickingUserCard(user[0]._id)} className=" user-msg-btn"><UserIcons userName={user[0].userName} userProfilePic={user[0].profilePic} /></button>
                    </div>))
                }
                
            </div>
            <div className="messages-current-chat">

                <div className="messages-current-chat-header">
                    <UserIcons userName={userUserName ? userUserName : 'No chat is selected'} userProfilePic={userProfilePicture ? userProfilePicture : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZpUJhFwB85GyHaxths8hBLh6L9kSmttcgOQ&s'} />
                </div>
                <div ref={chatContainerRef} className="messages-current-chat-chatter">
                    <div className="messages-current-chat-chatter-message-card">
                        {chatHistory &&  printMessageHistory()}
                    </div>
                </div>
                <div className="w-full h-[180px] flex flex-row items-center justify-between">
                        <textarea className="h-4/5 w-11/12 bg-white rounded-sm p-2" value={messageToSend} onChange={(e)=>setMessage(e.target.value)} ></textarea>
                        <button className="btn"  onKeyDown={(e)=>e.key === 'Enter' && handleSendMessageClick()}  onClick={()=>handleSendMessageClick()}>Send</button>
                </div>

            </div>
        </div>
     );
}
 
export default MessagesContainer;