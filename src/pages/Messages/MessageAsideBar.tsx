import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MessgagesDisplay from './MessgagesDisplay';
interface UserId{
    userId:string
}
 const MessageAsideBar: React.FC<UserId> = ({userId}) => {
    // this is going to generate people that the login user has a chat history with 
    // im generating all for texting purposes 
    // you can chnage this UI model if you dont want to follow it
    const [users,setUsers] = useState<any[]>([])
    const [user,setUser] = useState<string>('')
    let timeout: NodeJS.Timeout;             
    let doneTypingInterval = 1000;  
    const testing = (e:any) => {
        clearTimeout(timeout)
         const generateUser = async () => {
            const getUsers = await fetch(`http://localhost:2030/searchforusers`, {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({search: e.target.value})
            })
            const searchedUsers = await getUsers.json()
            setUsers(searchedUsers)
        }
        //console.log(e.target.textContent)
        timeout = setTimeout(async() => {
             generateUser()
            
        }, doneTypingInterval)
       
    
    }
    // useEffect(() => {
    //     const generateUser = async () => {
    //         const getUsers = await fetch(`http://localhost:2030/getusers/${user}`, {
    //             method:'GET',
    //             headers: {'Content-Type': 'application/json'}
    //         })
    //         const searchedUsers = await getUsers.json()
    //         setUsers(searchedUsers.users)
    //     }
    //     generateUser()
    // }, [user])
    const styles = {
        sidebar: {
            width: '25%',
            borderRight: '1px solid #ccc',
            padding: '10px',
        },
        userList: {
            listStyleType: 'none',
            padding: 0,
        },
        userItem: {
            padding: '10px',
            cursor: 'pointer',
            color: 'black'
        },
    };
    return (
    <div style={{display:'flex'}}>
        <div style={styles.sidebar}>
            <h2>search for cooks to message</h2>
            <input type="text" style={{backgroundColor: 'white'}} onKeyUp={testing} />
        <button onClick={testing}>button</button>
            {/* <ul style={styles.userList}>
                {users.map(user => (
                <Link to={`/messages/${user._id}`}>
                    <li key={user._id} style={styles.userItem}>
                        {user.userName}
                    </li>
                </Link>
                ))}
            </ul> */}
        </div>
        
            <MessgagesDisplay userId={userId}/>
        
    </div>
  );
}

export default MessageAsideBar
