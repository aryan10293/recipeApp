import React from 'react'
import { useState } from 'react'
import Navbar from '../../assets/Navbar'
interface SearchInfo{
    searchOption:string,
    searchText:string
}
function SearchPage() {
    const [searchOption, setSearchOption] = useState<string>("cooks")
    const [search, setSearch] = useState<string>("")
    const [searchData, setSearchData] = useState<any[]>([])
    const searchInfo:SearchInfo = {
        searchOption:searchOption,
        searchText:search
    }
    const searchThings: string[] = ['cooks', 'meals', 'ingridents', 'type of chefs', 'other']

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
      <div style={{marginTop:'50px'}}>
            <div>
                {searchThings.map((x:any) => {
                    return <button onClick={(e:any) => setSearchOption(e.target.innerHTML)}>{x}</button>
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
