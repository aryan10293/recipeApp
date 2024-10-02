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
    // const testing = (e:any) => {
    //     clearTimeout(timeout)
    //     console.log(e.target.value.trim().length)
    //      const generateUser = async () => {
    //         const getUsers = await fetch(`http://localhost:2030/searchforusers`, {
    //             method:'POST',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify({search: e.target.value})
    //         })
    //         const searchedUsers = await getUsers.json()
    //         console.log(searchedUsers)
    //         setUsers(searchedUsers.data)
    //     }
    //     //console.log(e.target.textContent)
    //     timeout = setTimeout(async() => {
    //          generateUser()
    //     }, doneTypingInterval)
    // }
    useEffect(() => {
        // const generateUser = async () => {
        //     const getUsers = await fetch(`http://localhost:2030/testing/`, {
        //         method:'GET',
        //         headers: {'Content-Type': 'application/json'}
        //     })
        //     const searchedUsers = await getUsers.json()
        //     setUsers(searchedUsers)
        // }
        // generateUser()
        const testing = async () => {
            const getMessagedUserHistory = await fetch(`http://localhost:2030/getuserchathistory`, {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id:userId})
            })
                const jsonGetMessagedUserHistory = await getMessagedUserHistory.json()
                console.log(jsonGetMessagedUserHistory)
                setUsers(jsonGetMessagedUserHistory.map((x:any) =>  x[0]))
            }
            testing()
        }, [userId])


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
    console.log(users)
    return (
    <div style={{display:'flex'}}>
        <div style={styles.sidebar}>
            <h2>search for cooks to message</h2>
            <input type="text" style={{backgroundColor: 'white'}} />
        <button >button</button>
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
