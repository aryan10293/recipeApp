import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const fetchData = async(url:string)=>{
    const {data} = await axios.get(url)
    return data
}

const useQueryFetch = (url:string)=>{
    const {data,status,error} = useQuery({queryKey:[url],queryFn:()=>fetchData(url)})

    if(status === 'pending'){
        return <p>Loading...</p>
    }
    if(status === 'error'){
        return <p>Error {error.message}</p>
    }

    return {data,status,error}
}

export default useQueryFetch

