import Header from "../../assets/Header";
import Navbar from "../../assets/Navbar";
import React, { useState } from "react";
interface UserId{
    user:any[]
}


const Profile:React.FC<UserId> = ({user}) => {
    console.log(user)
    const [userId, setUserId] =  useState<string>(user[0]._id)
    const [bio, setBio] = useState<string>(user[0].bio)
    const [cookingStyle, setCookingStyle] = useState<string>(user[0].cookingStyle)
    const [userName, setUserName] = useState<string>(user[0].userName)
    const [skillLevel, setSkillLevel] = useState<string>(user[0].skillLevel)
    const [profilePic, setProfilePic] = useState<string | undefined>()
    interface ProfileUpdate{
        bio:string;
        cookingStyle:string;
        userName:string;
        skillLevel:string;
        profilePic:string | undefined;
    }
    const profileUpdate: ProfileUpdate = {
        bio:bio,
        cookingStyle:cookingStyle,
        userName:userName,
        skillLevel:skillLevel,
        profilePic:profilePic
    }
    const convertBase64 = (file: any) => {
      return new Promise(async (resolve, reject) => {
        try {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.onload = () => {
            resolve(fileReader.result);
          };

          fileReader.onerror = (error) => {
            reject(error);
          };
        } catch (error) {
          reject(error);
        }
      });
    };
    // add this function to the input element for the file as a onchange function
    const handleProfilePic = async (e:any) => {
        console.log(e.currentTarget.files[0])
        const img:any = await convertBase64(e.currentTarget.files[0])
        setProfilePic(img)
    }
    const handleProfileChanges = async(e:any) => {
        e.preventDefault()
        // let img = e.currentTarget.childNodes[4].childNodes[1].files[0]
        // if(img === undefined){
        //     setProfilePic(undefined)
        // } else {
        //     img = await convertBase64(img)
        //     setProfilePic(img)
        // }
        const updatingProfile = await fetch(`http://localhost:2030/updateprofile/${userId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(profileUpdate)
        })
         const lmao = await updatingProfile.json()
         console.log(profileUpdate)
    }
    return ( 
        <div>
            <Navbar/>
            <Header text="Profile" margin="0"/>
            <div>
                <form onSubmit={handleProfileChanges}>
                    <div>
                        <label  style={{ color: 'black' }}>Username</label>
                         <input type="text"  onChange={(e:any) => setUserName(e.target.value)} style={{ backgroundColor: 'white', outline: '2px solid black' }} />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>Cooking Style</label>
                         <input type="text" onChange={(e:any) => setCookingStyle(e.target.value)}style={{ backgroundColor: 'white', outline: '2px solid black' }} />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>Skill Level</label>
                         <input type="text" onChange={(e:any) => setSkillLevel(e.target.value)} style={{ backgroundColor: 'white', outline: '2px solid black' }} />
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>Bio</label>
                         <textarea name="" id="" onChange={(e:any) => setBio(e.target.value)} cols={20} rows={5} style={{ backgroundColor: 'white', outline: '2px solid black' }} ></textarea>
                    </div>
                    <div>
                        <label style={{ color: 'black' }}>Profile Picture</label>
                         <input onChange={handleProfilePic} type="file" style={{ backgroundColor: 'white', outline: '2px solid black' }} />
                    </div>
                    <button>Save Changes</button>
                </form>
            </div>
        </div>
     );
}
 
export default Profile;