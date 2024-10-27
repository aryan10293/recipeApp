import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../../assets/Navbar'
import AdvancedSearch from './AdvancedSearch'
import {motion} from 'framer-motion'

interface SearchInfo{
    searchOption:string,
    searchText:string
}

// const user = useContext(UserContext)

// useEffect(()=>{
//     console.log(user);
    
// },[user])

function SearchPage() {
    const [searchOption, setSearchOption] = useState<string>("cooks")
    const [search, setSearch] = useState<string>("")
    const [searchData, setSearchData] = useState<any[]>([])
    const searchInfo:SearchInfo = {
        searchOption:searchOption,
        searchText:search
    }
    const searchThings: string[] = ['cooks', 'meals', 'type of chefs', 'other']

    // cooks searches through the user collection on the backend 
    // and looks for users that matches the substring of the search you enter 
    // will return all cooks that match the substring

    // meals searches the post collections and looks for substring matches in the nameOfDish
    // and or looks at the ingrediantlist and see if the search is included in there 
    // if so itll return all meals that match that critera

    // type of chefs return the cooks are "bakers" if thats what you enter "grill master" etc
    // will return all that matchs critera

    // other searches through post and users to see if the 
    // substring mathces ether a phrase in the post description or users bio 
    // will return multiple if somehow is matches more that one 
    // really didnt know what to do with other probably shopudl delete

    // also wanted to add a advanced search that'll 
    // include or exclude ingredients, deal with prep time, ratings, calories, protein count

    const testingSearch = async() => {
        const searchStuff = await fetch(`http://localhost:2030/search`, {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(searchInfo)
        })
        const jsonSearchStuff = await searchStuff.json()
        setSearchData(jsonSearchStuff.data)
        console.log(jsonSearchStuff, 12, searchInfo)
    }
    const handleAdvance = () => {
        console.log('lol')
    }
  return (
    <div className='rounded-md flex flex-col items-center'>
        <Navbar/>
        <motion.div 
        initial={{opacity:0,rotateX:90}}
        animate={{opacity:1,rotateX:0}}
        transition={{duration:0.3}}
        className='rounded-md flex flex-col w-[1000px] items-center bg-[#078080] mt-[75px] p-5 shadow-[5px_10px_10px_rgba(0,0,0,0.2)]'>
        <h1 className='text-2xl mb-1 font-medium'>Simple Search</h1>
        <hr className='w-[750px] rounded-3xl outline-none border-black mb-5' />
            <div className='flex flex-row w-full items-center justify-center'>
                {searchThings.map((x:any) => {
                    return <button className='btn ml-2 p-1 rounded-md capitalize mt-2' onClick={(e:any) => setSearchOption(e.target.innerHTML)}>{x}</button>
                })}
            </div>
            <div className='mt-5'>
                <input className='bg-white outline-none rounded-md p-1 mr-2' type="text" onChange={(e:any) => setSearch(e.target.value)} />
                <button className='btn p-1' onClick={testingSearch}>Search</button>
            </div>
      </motion.div>
      <AdvancedSearch/>
      <div className='mt-12'>
                {searchData.length > 0 ? (
                    searchData.map((x: any, index: any) => (
                    <p className='mt-2' key={index}>we got something chat</p>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
    </div>
  )
}

export default SearchPage
