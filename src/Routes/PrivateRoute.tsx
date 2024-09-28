import { JSXElementConstructor, ReactElement, useContext } from "react"
import UserContext from "../contexts/UserContext"
import { Navigate, redirectDocument } from "react-router-dom"


const PrivateRoute = ({children}) =>{
    const userId = useContext(UserContext)

    if(!userId){
        console.log('No token found')
        return <Navigate to={'/login'}/>
    }
    console.log('Token found');

    return children
}

export default PrivateRoute