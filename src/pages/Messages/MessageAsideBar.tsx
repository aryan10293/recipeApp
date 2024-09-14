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

    useEffect(() => {
        const generateUser = async () => {
            const getUsers = await fetch(`http://localhost:2030/getusers`, {
                method:'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const idkwhattocallthis = await getUsers.json()
            setUsers(idkwhattocallthis.users)
        }
        generateUser()
    }, [])
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
            <h2>Users</h2>
            <ul style={styles.userList}>
                {users.map(user => (
                <Link to={`/messages/${user._id}`}>
                    <li key={user._id} style={styles.userItem}>
                        {user.userName}
                    </li>
                </Link>
                ))}
            </ul>
        </div>
        
            <MessgagesDisplay userId={userId}/>
        
    </div>
  );
}

export default MessageAsideBar
