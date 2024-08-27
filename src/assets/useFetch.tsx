import { useEffect, useState } from "react"
import { json } from "react-router-dom"



const useFetch = (url:string)=>{
    const [data,setData] = useState<any>()
    useEffect(()=>{
        fetch(url)
            .then((res)=>{
               return res.json()
            })
            .then((data)=>{
                setData(data)
            })
            .catch((err)=>{
                console.log(err.message)
            })
    },[url])
    return {data}
}

export default useFetch