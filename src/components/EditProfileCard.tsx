import { faL, faTextHeight } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeCard from "../assets/RecipeCard";
import TimeButton from "../assets/TimeButton";
import DifficultyIcon from "../assets/DifficultyIcon";
import UserContext from "../contexts/UserContext";
import PendingMessage from "./PendingMessage";

interface ProfileCardProps{
    userName:string | null,
    profilePicture:string | undefined,
    cookingSkill:string | undefined,
    userID:string | undefined | null
    userEmail:string | undefined,
    userCountry:string | undefined,
    userFirstName:string | undefined,
    userLastName:string | undefined,
    cookingStyle:string | undefined,
    dob:string | undefined,
    accountAge: string | undefined
    bio:string | undefined,
    userFollowings: string[] | undefined,
    userFollowers : string[] | undefined
}

interface RecipeCard{
    nameOfDish:string,
    image:string,
    prepTime:number,
    ingridientList:string[],
    steps?:string,
    timeOfPost:string,
    likes:string[],
    recipeClass:string,
    _id:string,
    levelOfMeal:number,
    postIndex:number
    bio:string,

}

const EditProfileCard:React.FC<ProfileCardProps> = ({
    //props
    userFirstName,
    userLastName,
    userEmail,
    userCountry,
    userName,
    profilePicture,
    cookingSkill,
    cookingStyle,
    accountAge,
    dob,
    bio,
    userFollowings,
    userFollowers
    

}) => {

    //SER RECIPE CARD LOGIC
    const userId = useContext(UserContext)

    const [usersRecipes,setUsersRecipes] = useState<RecipeCard[]>([])
 
    const getUsersRecipes = async function(){
        try {
            const recipeResponse = await fetch('https://recipeapp-22ha.onrender.com/getallpost')
            if(!recipeResponse.ok){
                throw new Error('Response is not okay')
            }
            // console.log('User Id: ',userId);
            
            const recipeList = await recipeResponse.json()
            const usersRecipesArray:RecipeCard[] = await recipeList.post.filter((recipe:any)=>{
                return recipe.userWhoPostId === userId;
            })

            setUsersRecipes(usersRecipesArray)
            // console.log(usersRecipesArray);
            
        } catch (error) {
            // console.log(error);
        }
    }

    const iconStyle = {
        margin:'0px',
        backgroundColor:'transparent',
        border:'none',
        color:'#f8f5f2',
        fontSize:'1.5rem'
    }

    // Delete post logic
    const deletePost= async function(e:React.MouseEvent, postId:string){
        try {
            e.stopPropagation()
            const response = await fetch(`https://recipeapp-22ha.onrender.com/deletepost/${postId}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
            })
            if(!response){
                throw new Error('Failed to fetch delete API. Response is not ok')
            }
            const data = await response.json()
            if(!data){
                throw new Error('Failed to fetch delete API. Response data is not ok')
            }
            if(data.status === '200'){
                alert(data.message)
            } else if(data.status === '400'){
                alert(data.message)
            }
        } catch (error) {
            // console.log(error);
        }

     }

    // Rendering dificulty icons on recipe cards
    const renderDifficultyIcon = function(levelNum:number){
        let icons:JSX.Element[] = []
        const levelOfMeal = levelNum
        for(var i:number = 0;i<levelOfMeal;i++){
            icons.push(<DifficultyIcon style={iconStyle} key={i}/>)
        }
        return icons
    }

    const navigate = useNavigate()

    // Getting user's recipes data
    const handleClick = async function(id:string){
        try {
            const response = await fetch(`https://recipeapp-22ha.onrender.com/getpost/${id}`)
            const data = await response.json()
            // console.log('data: ',data.post[0]);
            const recipe = data
            
            navigate('/recipe',{state:{recipe:recipe}})
        } catch (error) {
            // console.log(error);
            
        } 
    }

    // Printing user recipe cards
    const printUsersRecipes = function(recipeArray: RecipeCard[]) {
        if (!recipeArray.length) {
            return <p>No recipes found.</p>;
        }

        return (
            <div className="recipe-list-container">
                
                {recipeArray.map((recipe)=>(
                    <button onClick={(e)=> handleClick(recipe._id)} className="user-recipe-list-container" key={recipe._id}>
                        <hr />  
                        <div className="left">
                            <img src={recipe.image} alt="" />
                        </div>
                        <div className="right">
                            <h3 className="text-start w-[500px]">{recipe.nameOfDish}</h3>
                            <h3 className="time-img" ><TimeButton/></h3>
                            <h3  className="prep-time">{recipe.prepTime}</h3>
                            <div className="diff-icons">
                                {renderDifficultyIcon(recipe.levelOfMeal)}
                            </div>
                            <button className="btn" onClick={(e)=>deletePost(e, recipe._id)}>Delete</button>

                        </div>
                        
                    </button>
                ))}
            </div>
        );
     };
    
    useEffect(()=>{
        // console.log('ID',userId);
        
        getUsersRecipes()
    },[])

    // PROFILE CARD LOGIC
    const [isEditingDetails,setIsEditingDetails] = useState<boolean>(false)

    const [uploadedImage,setUploadedImage] = useState<File | undefined>()
    const [convertedImage,setconvertedImage] = useState<string>("")

    const [newUserName,setNewUsername] = useState<any>(userName)
    const [newCountry,setNewCountry] = useState<string  | undefined >(userCountry)
    const [newSkillLevel,setNewSkillLevel] = useState<string | undefined>(cookingSkill)
    const [newCookingStyle,setNewCookingStyle] = useState<string | undefined>(cookingStyle)
    const [newDob,setNewDob] = useState<string | undefined>(dob)

    useEffect(()=>{
        fetchCardDetails()
    },[])

    // Data object to send in PUT request
    const detailData = {
        bio:bio,
        skillLevel:newSkillLevel,
        cookingStyle:newCookingStyle,
        dob:newDob,
        profilePic:convertedImage,
        userName:newUserName, 
        country:newCountry
    }

    // Fetching profile card info
    const fetchCardDetails = async function(){
        try {
            const response = await fetch (`https://recipeapp-22ha.onrender.com/getuserbyid/${userId}`)
            const data = await response.json()
            
            const userCookingStyle = data.user[0].cookingStyle           
            const userCountry = data.user[0].country            
            const userDob = data.user[0].dob            
            const userSkillLevel = data.user[0].skillLevel            
            const userImage = data.user[0].profilePic
            const userUsername = data.user[0].userName

            setNewCookingStyle(userCookingStyle)
            setNewCountry(userCountry)
            setNewDob(userDob)
            setNewSkillLevel(userSkillLevel)
            setconvertedImage(userImage)
            setNewUsername(userUsername)

            // console.log('Data is fetched and set');
        } catch (error) {
            // console.log(error);
        }        
    }

    // Sets the state of the user card if it is in edit mode or just view mode
    const setIsEditClick = async function(){
        if(!isEditingDetails){
            await fetchCardDetails()
            setIsEditingDetails(true)
        }
        else{
            // console.log('Data to see 0: ',detailData);
            await handleDetailsUpload()
            await fetchCardDetails()
            // console.log('Data to see 2: ',detailData);
            setIsEditingDetails(false)
        }      
    }

    // Sends user data update PUT request
    const handleDetailsUpload = async function(){
        // console.log('Data to see 1: ',detailData);
        
        try {
            const response = await fetch(`https://recipeapp-22ha.onrender.com/updateprofile/${userId}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(detailData)
            })
            if(!response.ok){
                throw new Error('Error while saving details data')
            }
            const data = await response.json()
            // console.log('Success! Details are updated',data);   
        } catch (error) {
            // console.log(error);  
        }
    }


    // Rendering the user profile view 
    const renderEditCard = function():JSX.Element{
        return(
            <div className="left">
                <div className="image">
                    <img src={profilePicture} alt="" />
                </div>
                <div className="info">
                    <h2 className="username">{newUserName ? newUserName : ''}</h2>
                    <h3 className="cooking-skill">{newSkillLevel ? newSkillLevel : ''} </h3>           
                    <h3 className="cooking-style">{newCookingStyle ? newCookingStyle : ''}</h3>
                    <h3 className="country">{newCountry ? newCountry : ''}</h3>
                    <h3 className="dob">{newDob ? newDob : ''}</h3>
                </div>
                <div className="follow-data">
                    <h4 style={{fontWeight:'400'}} className="following">Followers: {userFollowers?.length ? userFollowers?.length : <p className="pending-msg">Loading...</p>}</h4>
                    <h4 style={{fontWeight:'400'}} className="followers">Following: {userFollowings?.length ? userFollowings?.length : <p className="pending-msg">Loading...</p>}</h4> 
                </div>
                <button className="btn" onClick={setIsEditClick}>Edit Info</button>
                {/* <h3 style={{fontWeight:'400'}} className="date-of-registry">Member since: {'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'} {accountAge?.split('T')[0]}</h3> */}
            </div>
        )
    }

    // Rendering the user profile edit view 
    const renderBaseCard = function():JSX.Element{
        return(
            <div className="left">
                <div className="image">
                    <img src={convertedImage} alt="" />
                </div>
                <input accept="*" type="file" onChange={handleImageUpload}/>
                <div className="info">
                    <input value={newUserName} style={editStyle} placeholder='Username' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setNewUsername(e.target.value)} type="text" />

                <select value={newSkillLevel} style={editStyle} name="SkillLevel" id="SkillLevel" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setNewSkillLevel(e.target.value)}>
                    <option value="None">Cooking Skill</option>
                    <option value="Kitchen god">Kitchen god</option>
                    <option value="Everyday cook">Everyday cook</option>
                    <option value="Weekend cook">Weekend cook</option>
                    <option value="Lazy cook">Lazy cook</option>
                    <option value="Cooked once">Cooked once</option>
                    <option value="Me no cook">Me no cook</option>
                </select>
                  
                <select style={editStyle} name="CookingStyle" id="CookingStyle" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setNewCookingStyle(e.target.value)}>
                    <option value="None">Cooking Style</option>
                    <option value="Grill Master">Grill Master</option>
                    <option value="Baker">Baker</option>
                    <option value="One pot wonder">One pot wonder</option>
                    <option value="Pasta Masta">Pasta Masta</option>
                    <option value="Wok tosser">Wok tosser</option>
                </select>
                    <input value={newCountry} style={editStyle} placeholder='Country' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setNewCountry(e.target.value)} type="text" />
                    <input style={editStyle} type="date" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setNewDob(e.target.value)}/>

                    {/* <h3 className="date-of-registry">Member since: {'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'} {accountAge?.split('T')[0]}</h3> */}
                    
                </div>
                <button className="btn" onClick={setIsEditClick}>Save Changes</button>
            </div>
        )
    }

    // Image upload logic
    const handleImageUpload = async function(e:React.ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files.length !== 0){
            const file = e.target.files[0]
            setUploadedImage(file)
            const base64Image = await base64_encode(file)
            setconvertedImage(base64Image)
        }
    }

    // Converting Image to base64 string
    const base64_encode = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    }

    // Edit view styles
    const editStyle = {
        backgroundColor:'white',
        border:'none',
        margin:'10px 0 10px 0',
        padding:'5px',
        fontSize:'1rem',
        // textAlign:'start',
        borderRadius:'5px'
    }

    //PROFILE BIO SETTINGS
    const [isEditingBio,setIseditingBio] = useState<boolean>(false)
    const [newBio,setNewBio] = useState<string | undefined>(bio)

    // Fetching bio data from database
    const fetchBio = async function(){
        const response = await fetch(`https://recipeapp-22ha.onrender.com/getuserbyid/${userId}`)
        const data = await response.json()
        const userBio = data.user[0].bio
        // console.log('Bio is fetched');
        setNewBio(userBio)
    }

    // View toggle between edit/view profile
    const setIsEditingBioClick = async function(){
        if(!isEditingBio){
            await fetchBio()
            setIseditingBio(true)
        }
        else{
            await handleBioSave()
            await fetchBio()
            setIseditingBio(false)  
        }
    }

    useEffect(()=>{
        fetchBio()
    },[])

    // Sending bio update PUT request
    const handleBioSave = async function(){
        try {
            const response = await fetch(`https://recipeapp-22ha.onrender.com/updateprofile/${userId}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify( {
                    bio:newBio,
                    userName:userName,
                    skillLevel:cookingSkill,
                    cookin:cookingStyle
                })
            })
            if(!response.ok){
                throw new Error('Error while saving bio data')
            }
            const data = await response.json()
            // console.log('Success! Bio is updated',data);
            await fetchBio()
            
        } catch (error) {
            // console.log(error);  
        }
    }

    // Rendering profile bio view card
    const renderEditBioCard = function():JSX.Element{
        return (
            <div style={{overflow:'auto'}} className="bio">
                    <h3 style={{fontWeight:'400'}}>{userName + `'s bio`}</h3>
                    <hr/>
                    <p>{newBio ? newBio : 'Tell the other cooks about yourself!'}</p>
                    <button className="btn" onClick={setIsEditingBioClick} style={{textAlign:'end'}}>Edit Bio</button>
                </div>
        )
    }

    // Rendering profile bio edit card
    const renderBaseBioCard = function():JSX.Element{
        return (
            <div className="bio">
                    <h3 style={{fontWeight:'400'}}>{userName + `'s bio`}</h3>
                    <hr />
                        <textarea value={newBio} onChange={e=>(setNewBio(e.target.value))} style={{width:'100%',height:'60%',resize:'none',background:'white',border:'none',fontSize:'1.2rem',padding:'5px'}} name="" id=""></textarea>
                    <button className="btn" onClick={setIsEditingBioClick} style={{textAlign:'end'}}>Save Changes</button>
                </div>
        )
    }
    

    return ( 
        <div className="profile-card">
            {isEditingDetails ? renderBaseCard() : renderEditCard()}
            
            <div className="right">
                {isEditingBio ? renderBaseBioCard() : renderEditBioCard()}

                <div className="recipes">   
                    <h3 style={{fontWeight:'400'}}>{userName}'s posted recipes({usersRecipes.length})</h3>
                    <hr />

                    {printUsersRecipes(usersRecipes)}
  
                </div>
            </div>  
        </div>
     );
}
 
export default EditProfileCard;