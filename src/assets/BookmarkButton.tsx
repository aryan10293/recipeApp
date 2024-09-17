import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, BlockquoteHTMLAttributes } from 'react';
import useUserId from '../Utils/useGetUserId';
import RecipeCard from './RecipeCard';
import { UNSAFE_FetchersContext } from 'react-router-dom';
interface PostId{
    postId: string
    userId: string | undefined,
}
const BookmarkButton:React.FC<PostId> = ({postId, userId})=> {

    const style1 = {
        backgroundColor:'transparent',
        border:'none',
        margin:'0 0 0 15px',
        color:'#f8f5f2'
    }
    const style2 = {
        backgroundColor:'transparent',
        border:'none',
        margin:'0 0 0 15px',
        color:'#BF3131'
    }

    const intitialize = async function (){
       
    }

    useEffect(()=>{
        fetchBookmarks()
    },[])

    const [bookmarks,setBookmarks] = useState<string[]>([])
    const [isRecipeSaved,setIsRecipeSaved] = useState<boolean>(false)

    const fetchBookmarks = async function(){
        const response = await fetch(`http://localhost:2030/getuserbyid/${userId}`)
        const data = await response.json()
        const userBookmarks = await data.user[0].savedRecipes

        const isSaved = userBookmarks.includes(postId)
        setIsRecipeSaved(isSaved)
        setBookmarks(userBookmarks)
    }

    const bookmarkRecipe = async () => {
        try {
            const response = await fetch(`http://localhost:2030/addbookmark/${userId}`,{
                method:"PUT",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({id:postId})
            })
            
            if(!response.ok){
                throw new Error('Could not bookmark')
            }
            
            console.log('Success!',response, 'User ID: ',userId);
            alert('Recipe saved')
            await fetchBookmarks()
             
        } catch (error) {
            console.log(error)
        }
    }

    const unBookmarkRecipe = async () => {
        try {
            console.log('Beginning of unbookmarking');
            console.log(userId,postId);
            
            const response = await fetch(`http://localhost:2030/unbookmark/${userId}`,{
                method:"PUT",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({id:postId})
            })
            
            if(!response.ok){
                throw new Error('Could not remove bookmark')
            }
            
            console.log('Success! Recipe is unbookmarked',response, 'User ID: ',userId);
            alert('Recipe unsaved')
            await fetchBookmarks()
           
        } catch (error) {
            console.log(error)
        }
    }

    const checkIfRecipeIsBookmarked = async function(){
        const contains = bookmarks?.includes(postId)
        setIsRecipeSaved(contains)    
        return contains
    }


    const handleBookmark = async function(e:React.MouseEvent){
        e.stopPropagation()
        const bookmarked:boolean | undefined = await checkIfRecipeIsBookmarked()
        console.log(bookmarked);
        
        if(!bookmarked){
            bookmarkRecipe()
            setIsRecipeSaved(true)
        }
        else{  
            unBookmarkRecipe()
            setIsRecipeSaved(false)
        }  
    }


    return ( 
        <div className='bookmark-button'>
            {bookmarks && <button onClick={(e)=>handleBookmark(e)} style={isRecipeSaved ? style2:style1}><FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon></button>}
        </div>
     );
}
 
export default BookmarkButton;