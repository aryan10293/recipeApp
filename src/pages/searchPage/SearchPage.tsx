import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../../assets/Navbar'
import AdvancedSearch from './AdvancedSearch'
import {AnimatePresence, motion} from 'framer-motion'
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

        // Checking if token is present
        const isThereToken = localStorage.getItem('token')
        useEffect(()=>{
          if(!isThereToken){
              navigate('/')
          }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const searchThings: string[] = ['cooks', 'meals', 'type of chefs', 'other']

    useEffect(()=>{
        // console.log('Result: ',searchData);
        // console.log('Search Option: ',searchOption)
        // console.log('UserName: ',userUsername);
        
    },[searchData,searchOption,userUsername])


    const testingSearch = async() => {
        const searchStuff = await fetch(`https://recipeapp-22ha.onrender.com/search`, {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(searchInfo)
        })
        const jsonSearchStuff = await searchStuff.json()
        setSearchData(jsonSearchStuff.data)
        // console.log(jsonSearchStuff, 12, searchInfo)
    }
    
    const handleAdvance = () => {
        // console.log('lol')
    }

    // User Result Clicking
    const handleUserCardClick = function(id:string){
        navigate('/profile',{state:{userID:id}})
    }

    // Choosing what type of data will be printed and print it
    const printTypeSetter = function(data:any,key:number){
        // console.log('Search data',data);
        if(searchOption=== 'cooks' && data.userName){
            return (
                <button onClick={()=>handleUserCardClick(data._id)} className='bg-[#078080] w-[1000px] flex flex-row items-center justify-start mb-2 p-5 hover:bg-opacity-80' key={data._id}>
                    <div className='w-[100px] h-[100px] rounded-full overflow-hidden flex:1 mr-12'>
                        <img className='overflow-hidden object-contain' src={data.profilePic} alt="" />
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
                     <RecipeCard likes={data.likes} userID={data.userWhoPostId} _id={data._id} recipeName={data.nameOfDish} recipeImage={data.image} recipeTime={data.prepTime} ingridientList={data.ingredientList} levelOfMeal={data.levelOfMeal} userWhoPostId={data.userWhoPostId} calories={data.calories} fats={data.fats} carbs={data.carbs} protein={data.protein} showFollow={false} recipeClass='recipe-card'/>
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
                     <RecipeCard showFollow={false} likes={data.likes} userID={data.userWhoPostId} _id={data._id} recipeName={data.nameOfDish} recipeImage={data.image} recipeTime={data.prepTime} ingridientList={data.ingredientList} levelOfMeal={data.levelOfMeal} userWhoPostId={data.userWhoPostId} calories={data.calories} fats={data.fats} carbs={data.carbs} protein={data.protein} recipeClass='recipe-card'/>
                </div>
            )
        }
        else{
            return (
                <div>
                    <p></p>
                </div>
            )
        }
    }
  return (

    <div className='rounded-md flex flex-col items-center'>
        <Navbar userProfilePicture={userProfilePicture} userName={userUsername}/>
        <button className='mt-[75px] btn' onClick={()=>{setSearchData([]);setShowSimpleSearch(!showSimpleSearch)}}>{showSimpleSearch ? 'Advanced Search' : 'Simple Search'}</button>
        <AnimatePresence mode="wait">
        {showSimpleSearch ?  
        
        <motion.div 
        key="wholediv"
        initial={{opacity:0,rotateX:90}}
        animate={{opacity:1,rotateX:0}}
        transition={{duration:0.3}}
        exit={{opacity:0,rotateX:90}}
        className='rounded-md flex flex-col w-[1000px] items-center bg-[#078080] mt-[25px] p-5 shadow-[5px_10px_10px_rgba(0,0,0,0.2)]'>
        <h1 className='text-2xl mb-1 font-medium capitalize'>Simple Search - {searchOption}</h1>
        <hr className='w-[750px] rounded-3xl outline-none border-black mb-5' />
            <div className='flex flex-row w-full items-center justify-center'>
                {searchThings.map((x:string) => {
                    return <button className='btn ml-2 p-1 rounded-md capitalize mt-2' onClick={(e:any) => setSearchOption(e.target.innerHTML)}>{x}</button>
                })}
            </div>
            <div className='mt-5'>
                {searchOption === 'type of chefs' ? <select className='px-2 py-1 bg-[#f8f5f2] text-black font-medium cursor-pointer rounded-md border-none shadow-[0px_5px_10px_rgba(0,0,0,0.2)] h-[30px] hover:bg-opacity-80 mr-2' name="" id="" onChange={(e:any) => setSearch(e.target.value)}>
                    <option value="Wok Tosser">Wok Tosser</option>
                    <option value="Grill Master">Grill Master</option>
                    <option value="Baker">Baker</option>
                    <option value="Pasta Masta">Pasta Masta</option>
                    <option value="One pot wonder">One pot wonder</option>
                </select> : <input className='bg-white outline-none rounded-md p-1 mr-2' type="text" onChange={(e:any) => setSearch(e.target.value)} />}
                <button className='btn p-1' onClick={()=>testingSearch()}>Search</button>
            </div>
            
      </motion.div>: <AdvancedSearch/>}</AnimatePresence>
      
      {/* {printTypeSetter()} */}
      <div className='mt-12 flex flex-col items-center w-[1000px] p-5 bg-transparent'>
                {searchData.length > 0 ? (
                    searchData.map((result: object, index: number) => (
                    <motion.div 
                    key='advanced'
                    className=''
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{delay:index*0.3,times:0.3}}

                    >
                        {printTypeSetter(result,index)}
                    </motion.div>
                    
                    ))
                ) : (
                    <p>No result</p>
                )}
            </div>
    </div>
  )
}

export default SearchPage
