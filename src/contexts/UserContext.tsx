import { createContext, ReactNode, useEffect, useState } from "react";

const UserContext = createContext(null)
interface UserContextProps{
    children: ReactNode
}

export const UserProvider:React.FC<UserContextProps> = ({children}) =>{
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(()=>{
        const fetchUser = async function(){
            try {
                const token = localStorage.getItem('token')
                if(!token){
                    setLoading(false)
                    console.log('No token found')    
                    return
                }

                const response = await fetch(`http://localhost:2030/getuser/${token}`)
                if(!response.ok){
                    throw new Error('Issue with fetching!')
                } 
                const data = await response.json()
                setUser(data.userinfo[0]._id)
                console.log('Logged In User ID: ',data.userinfo[0]._id);
                
            } catch (error) {
                console.error('Error with fetching the user/token',error);
            }
            finally{
                setLoading(false)
            }
        }
        fetchUser()
    },[])

    if(loading){
        return <div>Loading...</div>
    }
    return(
        <UserContext.Provider value={user}>
            {children}    
        </UserContext.Provider>
    )
}

export default UserContext
