import { faL, faTextHeight } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeCard from "../assets/RecipeCard";
import TimeButton from "../assets/TimeButton";
import DifficultyIcon from "../assets/DifficultyIcon";
import UserContext from "../contexts/UserContext";

interface ProfileCardProps{
    userName:string | null,
    profilePicture:string | undefined,
    cookingSkill:string | undefined,
    userID:string | undefined
    userEmail:string | undefined,
    userCountry:string | undefined,
    userFirstName:string | undefined,
    userLastName:string | undefined,
    cookingStyle:string | undefined,
    dob:string | undefined,
    accountAge: string | undefined
    bio:string | undefined
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
    bio:string
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
    bio

}) => {

    //SER RECIPE CARD LOGIC
    const userId = useContext(UserContext)

    const [usersRecipes,setUsersRecipes] = useState<RecipeCard[]>([])
 
    const getUsersRecipes = async function(){
        try {
            const recipeResponse = await fetch('http://localhost:2030/getallpost')
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
            console.log(error);
        }
    }

    const iconStyle = {
        margin:'0px',
        backgroundColor:'transparent',
        border:'none',
        color:'#f8f5f2',
        fontSize:'1.5rem'
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
            const response = await fetch(`http://localhost:2030/getpost/${id}`)
            const data = await response.json()
            console.log('data: ',data.post[0]);
            const recipe = data
            
            navigate('/recipe',{state:{recipe:recipe}})
        } catch (error) {
            console.log(error);
            
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
                            <h3 className="name-of-dish">{recipe.nameOfDish}</h3>
                            <h3 className="time-img" ><TimeButton/></h3>
                            <h3  className="prep-time">{recipe.prepTime}</h3>
                            {renderDifficultyIcon(recipe.levelOfMeal)}
                        </div>
                        
                    </button>
                ))}
            </div>
        );
     };
    
    useEffect(()=>{
        console.log('ID',userId);
        
        getUsersRecipes()
    },[])

    // PROFILE CARD LOGIC
    const [isEditingDetails,setIsEditingDetails] = useState<boolean>(false)

    const [uploadedImage,setUploadedImage] = useState<File | undefined>()
    const [convertedImage,setconvertedImage] = useState<string>("")

    const [newUserName,setNewUsername] = useState<string>(userName)
    const [newCountry,setNewCountry] = useState<string>(userCountry)
    const [newSkillLevel,setNewSkillLevel] = useState<string>(cookingSkill)
    const [newCookingStyle,setNewCookingStyle] = useState<string>(cookingStyle)
    const [newDob,setNewDob] = useState<string>('dob')

    useEffect(()=>{
        fetchCardDetails()
    },[])

    // Data object to send in PUT request
    const detailData = {
        bio:bio,
        skillLevel:newSkillLevel,
        cooking:newCookingStyle,
        dob:newDob,
        profilePic:convertedImage,
        userName:newUserName, 
        country:newCountry
    }

    // Fetching profile card info
    const fetchCardDetails = async function(){
        try {
            const response = await fetch (`http://localhost:2030/getuserbyid/${userId}`)
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

            console.log('Data is fetched and set');
        } catch (error) {
            console.log(error);
        }        
    }

    // Sets the state of the user card if it is in edit mode or just view mode
    const setIsEditClick = async function(){
        if(!isEditingDetails){
            await fetchCardDetails()
            setIsEditingDetails(true)
        }
        else{
            console.log('Data to see 0: ',detailData);
            await handleDetailsUpload()
            await fetchCardDetails()
            console.log('Data to see 2: ',detailData);
            setIsEditingDetails(false)
        }      
    }

    // Sends user data update PUT request
    const handleDetailsUpload = async function(){
        console.log('Data to see 1: ',detailData);
        
        try {
            const response = await fetch(`http://localhost:2030/updateprofile/${userId}`,{
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
            console.log('Success! Details are updated',data);   
        } catch (error) {
            console.log(error);  
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
                    <h2 className="username">{newUserName}</h2>
                    <h3 className="cooking-skill">{newSkillLevel}</h3>                    
                    <h3 className="cooking-style">{newCookingStyle}</h3>
                    <h3 className="country">{newCountry}</h3>
                    <h3 className="dob">{newDob}</h3>
                </div>
                <div className="follow-data">
                    <h4 style={{fontWeight:'400'}} className="following">Followers: 20</h4>
                    <h4 style={{fontWeight:'400'}} className="followers">Following: 45</h4>
                </div>
                <button onClick={setIsEditClick}>Edit Info</button>
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
                <button onClick={setIsEditClick}>Save Changes</button>
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
        const response = await fetch(`http://localhost:2030/getuserbyid/${userId}`)
        const data = await response.json()
        const userBio = data.user[0].bio
        console.log('Bio is fetched');
        setNewBio(userBio)
    }

    // Viev toggle between edit/view profile
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
            const response = await fetch(`http://localhost:2030/updateprofile/${userId}`,{
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
            console.log('Success! Bio is updated',data);
            await fetchBio()
            
        } catch (error) {
            console.log(error);  
        }
    }

    // Rendering profile bio view card
    const renderEditBioCard = function():JSX.Element{
        return (
            <div style={{overflow:'auto'}} className="bio">
                    <h3 style={{fontWeight:'400'}}>{userName + `'s bio`}</h3>
                    <hr/>
                    <p>{newBio}</p>
                    <button onClick={setIsEditingBioClick} style={{textAlign:'end'}}>Edit Bio</button>
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
                    <button onClick={setIsEditingBioClick} style={{textAlign:'end'}}>Save Changes</button>
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