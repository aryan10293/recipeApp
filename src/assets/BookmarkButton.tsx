import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, BlockquoteHTMLAttributes } from 'react';
import useUserId from '../Utils/useGetUserId';
import RecipeCard from './RecipeCard';
interface PostId{
    postId: string
    userId: string | undefined,
}
const BookmarkButton:React.FC<PostId> = ({postId, userId})=> {

    const style = {
        backgroundColor:'transparent',
        border:'none',
        margin:'0 0 0 15px',
        color:'#f8f5f2'
    }

    const {userBookmarks:userBookmarks} = useUserId()

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
           
        } catch (error) {
            console.log(error)
        }
    }

    const checkIfRecipeIsBookmarked = async function(){
        const bookmarks:string[] | undefined= await userBookmarks
        const contains = bookmarks?.includes(postId)    
        return contains
    }

    const handleBookmark = async function(e:React.MouseEvent){
        e.stopPropagation()
        const bookmarked:boolean | undefined = await checkIfRecipeIsBookmarked()
        console.log(bookmarked);
        
        if(!bookmarked){
            bookmarkRecipe()
        }
        else{  
            unBookmarkRecipe()
        }  
    }



    return ( 
        <div className='bookmark-button'>
            {/* <button onClick={(e)=>{handleClick(e)}} style={style}><FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon></button> */}
            <button onClick={(e)=>handleBookmark(e)} style={style}><FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon></button>
        </div>
     );
}
 
export default BookmarkButton;