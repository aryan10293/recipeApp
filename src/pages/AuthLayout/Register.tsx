import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
    const [username, setUsername] = React.useState<string>('')
    const [first, setFirst] = React.useState<string>('')
    const [last, setLast] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const[confirmPassword, setConfirmPassword] = React.useState<string>('')
    const [country, setCountry] = React.useState<string>('')
    const [dob, setDob] = React.useState<string>('')
    const [skillLevel, setSkillLevel] = React.useState<string>('')
    const [cookingStyle, setCookingStyle] = React.useState<string>('')
    const [bio,setBio] = useState<string>("")

    interface RegisterInfo{
        username:string,
        first:string,
        last:string,
        email:string,
        password:string,
        confirmPassword:string,
        country:string,
        skillLevel:string,
        cookingStyle: string,
        dob:string,
        bio:string

    }
    const registerInfo: RegisterInfo = {
        username:username,
        first:first,
        last:last,
        email:email,
        password:password,
        confirmPassword:confirmPassword,
        country:country,
        skillLevel:skillLevel,  
        cookingStyle: cookingStyle,
        dob:dob,
        bio:bio
    }
    const handleSubmit = async (e:React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        try {
            const createUser =  await fetch('https://recipeapp-22ha.onrender.com/createaccount',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registerInfo),
        })

        const createUserRequestInfo = await createUser.json()
        if(createUserRequestInfo.status === '200'){
            alert('Succesful registration!')
            console.log(createUserRequestInfo)
            console.log(createUser)
            window.location.href = '/login'
        } else {
            alert('there was an error')
        }
        console.log('Sent registration data: ',registerInfo);
        console.log('Created user data: ',createUserRequestInfo)
        
        
        } catch (error) {
            console.log(error)
        }

        useEffect(()=>{
            console.log(username);
            
        },[username])
       
    }
  return (
    <div className='register-box'>
      <form onSubmit={handleSubmit} className='register-form' action="">
        <h2 className='hero'>Register</h2>
        <div className="inputs">
            <div className='input-fields'>     
                <input placeholder='First Name' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFirst(e.target.value)} type="text" />
                <input placeholder='Last Name' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setLast(e.target.value)} type="text" />
                <input placeholder='Username' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} type="text" />
                <input placeholder='Country' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)} type="text" />
                <input type="date" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setDob(e.target.value)}/>
                <select  name="SkillLevel" id="SkillLevel" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setSkillLevel(e.target.value)}>
                    <option value="None">Cooking Skill</option>
                    <option value="Kitchen god">Kitchen god</option>
                    <option value="Everyday cook">Everyday cook</option>
                    <option value="Weekend cook">Weekend cook</option>
                    <option value="Lazy cook">Lazy cook</option>
                    <option value="Cooked once">Cooked once</option>
                    <option value="Me no cook">Me no cook</option>
                </select>
                <select name="CookingStyle" id="CookingStyle" onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setCookingStyle(e.target.value)}>
                    <option value="None">Cooking Style</option>
                    <option value="Grill Master">Grill Master</option>
                    <option value="Baker">Baker</option>
                    <option value="One pot wonder">One pot wonder</option>
                    <option value="Pasta Masta">Pasta Masta</option>
                    <option value="Wok tosser">Wok tosser</option>
                </select>
                <input placeholder='E-mail adress' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" />
                <input placeholder='Password' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="password" />
                <input placeholder='Confirm Password' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} type="password" />
            </div>
        </div>
        <button>Create Account</button>
        <Link to={"/login"}  className='redirect-btn'><p>Already a member? Sign in here</p></Link>
      </form>
    </div>
  )
}


// ADD bio,cookingStyle,dob

export default Register