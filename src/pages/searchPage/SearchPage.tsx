import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../../assets/Navbar'
import UserContext from '../../contexts/UserContext'
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
    // include or exclude ingrediants, deal with prep time, ratings, calories, protein count

    const testingSearch = async() => {
        const searchStuff = await fetch(`http://localhost:2030/search`, {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(searchInfo)
        })
        const jsonSearchStuff = await searchStuff.json()
        setSearchData(jsonSearchStuff.getSearchData)
        console.log(jsonSearchStuff, 12, searchInfo)
    }
  return (
    <>
        <Navbar/>
        <div className='flex flex-col w-full mt-10 items-center'>
            <div className='flex flex-row p-3 w-full items-center justify-center'>
                {searchThings.map((x:any) => {
                    return <button className='ml-2 p-1 rounded-md capitalize' onClick={(e:any) => setSearchOption(e.target.innerHTML)}>{x}</button>
                })}
            </div>
            <div>
                <input type="text" onChange={(e:any) => setSearch(e.target.value)} />
                <button onClick={testingSearch}>Search for the stuff</button>
            </div>
            <div>
                {searchData.length > 0 ? (
                    searchData.map((x: any, index: any) => (
                    <p key={index}>we got something chat</p>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    </>
  )
}

export default SearchPage