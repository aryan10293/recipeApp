import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../../assets/Navbar'
import AdvancedSearch from './AdvancedSearch'
import {motion} from 'framer-motion'
import UserContext from '../../contexts/UserContext'
import useGetUserDataFromId from '../../Utils/useGetUserDataFromId'
import RecipeCard from '../../assets/RecipeCard'

import {faPersonWalking } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

interface SearchInfo{
    searchOption:string,
    searchText:string
}

function SearchPage() {
    const navigate = useNavigate()
    const [searchOption, setSearchOption] = useState<string>("cooks")
    const [search, setSearch] = useState<string>("")
    const [searchData, setSearchData] = useState<any[]>([])
    const [showSimpleSearch,setShowSimpleSearch] = useState<boolean>(true)
    
    const userId = useContext(UserContext)
    const {userUsername,userProfilePicture} = useGetUserDataFromId(userId)

    const searchInfo:SearchInfo = {
        searchOption:searchOption,
        searchText:search
    }
    const searchThings: string[] = ['cooks', 'meals', 'type of chefs', 'other']

    useEffect(()=>{
        console.log('Result: ',searchData);
        console.log('Search Option: ',searchOption)
        console.log('UserName: ',userUsername);
        
    },[searchData,searchOption,userUsername])

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

    // User Result Clicking
    const handleUserCardClick = function(id:string){
        navigate('/profile',{state:{userID:id}})
    }

    // Choosing what type of data will be printed and print it
    const printTypeSetter = function(data:any,key:number){
        console.log('Search data',data);
        if(searchOption=== 'cooks' && data.userName){
            return (
                <button onClick={()=>handleUserCardClick(data._id)} className='bg-[#078080] w-[1000px] flex flex-row items-center justify-start mb-2 p-5 hover:bg-opacity-80' key={data._id}>
                    <div className='w-[100px] h-[100px] rounded-full overflow-hidden flex:1 mr-12'>
                        <img className='overflow-hidden' src={data.profilePic} alt="" />
                    </div>                 
                    <h2 className='search-results flex:1 w-[150px] mr-5'>{data.userName}</h2>
                    <h2 className='search-results flex:1 w-[150px] mr-5'>{data.skillLevel}</h2>
                    <h2 className='search-results flex:1 w-[150px] mr-5'>{data.cookingStyle}</h2>
                    <h2 className='search-results flex:1 w-[150px] mr-5'><FontAwesomeIcon icon={faPersonWalking} className='scale-110 mr-2 p-0 text-center'></FontAwesomeIcon>{data.followers.length}</h2>
                </button>
            )
        }
        if(searchOption === 'meals' && data.nameOfDish){
            return (
                
                <div className='bg-transparent'>
                     {/* <button className='search-results'>{data.nameOfDish}</button> */}
                     <RecipeCard likes={data.likes} userID={data.userWhoPostId} _id={data._id} recipeName={data.nameOfDish} recipeImage={data.image} recipeTime={data.prepTime} ingridientList={data.ingredientList} levelOfMeal={data.levelOfMeal} userWhoPostId={data.userWhoPostId} calories={data.calories} fats={data.fats} carbs={data.carbs} protein={data.protein} recipeClass='recipe-card'/>
                </div>
            )
        }
        if(searchOption === 'type of chefs' && data.userName ){
            return (
                <button onClick={()=>handleUserCardClick(data._id)} className='bg-[#078080] w-[1000px] flex flex-row items-center justify-start mb-2 p-5 hover:bg-opacity-80' key={data._id}>
                    <div className='w-[100px] h-[100px] rounded-full overflow-hidden flex:1 mr-12'>
                        <img className='overflow-hidden' src={data.profilePic} alt="" />
                    </div>                 
                    <h2 className='search-results flex:1 w-[150px] mr-5'>{data.userName}</h2>
                    <h2 className='search-results flex:1 w-[150px] mr-5'>{data.skillLevel}</h2>
                    <h2 className='search-results flex:1 w-[150px] mr-5'>{data.cookingStyle}</h2>
                    <h2 className='search-results flex:1 w-[150px] mr-5'><FontAwesomeIcon icon={faPersonWalking} className='scale-110 mr-2 p-0 text-center'></FontAwesomeIcon>{data.followers.length}</h2>
                </button>
            )
        }
        if(searchOption === 'other' && data.nameOfDish){
            return (
                
                <div className='bg-transparent'>
                     {/* <button className='search-results'>{data.nameOfDish}</button> */}
                     <RecipeCard likes={data.likes} userID={data.userWhoPostId} _id={data._id} recipeName={data.nameOfDish} recipeImage={data.image} recipeTime={data.prepTime} ingridientList={data.ingredientList} levelOfMeal={data.levelOfMeal} userWhoPostId={data.userWhoPostId} calories={data.calories} fats={data.fats} carbs={data.carbs} protein={data.protein} recipeClass='recipe-card'/>
                </div>
            )
        }
        else{
            return (
                <div>
                    <p>No data</p>
                </div>
            )
        }
    }
  return (

    <div className='rounded-md flex flex-col items-center'>
        <Navbar userProfilePicture={userProfilePicture} userName={userUsername}/>
        <button className='mt-[75px] btn' onClick={()=>setShowSimpleSearch(!showSimpleSearch)}>{showSimpleSearch ? 'Advanced Search' : 'Simple Search'}</button>
        {showSimpleSearch ?  <motion.div 
        initial={{opacity:0,rotateX:90}}
        animate={{opacity:1,rotateX:0}}
        transition={{duration:0.3}}
        className='rounded-md flex flex-col w-[1000px] items-center bg-[#078080] mt-[25px] p-5 shadow-[5px_10px_10px_rgba(0,0,0,0.2)]'>
        <h1 className='text-2xl mb-1 font-medium'>Simple Search</h1>
        <hr className='w-[750px] rounded-3xl outline-none border-black mb-5' />
            <div className='flex flex-row w-full items-center justify-center'>
                {searchThings.map((x:string) => {
                    return <button className='btn ml-2 p-1 rounded-md capitalize mt-2' onClick={(e:any) => setSearchOption(e.target.innerHTML)}>{x}</button>
                })}
            </div>
            <div className='mt-5'>
                <input className='bg-white outline-none rounded-md p-1 mr-2' type="text" onChange={(e:any) => setSearch(e.target.value)} />
                <button className='btn p-1' onClick={()=>testingSearch()}>Search</button>
            </div>
            
      </motion.div> : <AdvancedSearch/>}
      
      {/* {printTypeSetter()} */}
      <div className='mt-12 flex flex-col items-center w-[1000px] p-5 bg-transparent'>
                {searchData.length > 0 ? (
                    searchData.map((result: object, index: number) => (
                    <div className=''>
                        {printTypeSetter(result,index)}
                    </div>
                    
                    ))
                ) : (
                    <p>No result</p>
                )}
            </div>
    </div>
  )
}

export default SearchPage
