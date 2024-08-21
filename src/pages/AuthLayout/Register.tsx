import React from 'react'
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

    interface RegisterInfo{
        username:string,
        first:string,
        last:string,
        email:string,
        password:string,
        confirmPassword:string,
        country:string,
        skillLevel:string,
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
    }
    const handleSubmit = async (e:React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        try {
            const createUser =  await fetch('http://localhost:2020/createaccount',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registerInfo),
        })

        const createUserRequestInfo = await createUser.json()
        if(createUserRequestInfo.status === '200'){
            console.log(createUserRequestInfo)
        } else {
            alert('there was an aerror')
        }

        console.log(createUserRequestInfo)
        } catch (error) {
            console.log(error)
        }

       
    }
  return (
    <div className='register-box'>
      <form onSubmit={handleSubmit} className='register-form' action="">
        <div className="inputs">
            <div className='input-titles'>
                <label htmlFor="firstname">First Name</label>
                <label htmlFor="lastname">Last Name</label>
                <label htmlFor="username">Username</label>
                <label htmlFor="country">Country</label>
                <label htmlFor="skilllevel">Skill Level</label>
                <label htmlFor="email">Email</label>
                <label htmlFor="password">Password</label>
                <label htmlFor="confirmpassword">Confirm Password</label>      
            </div>
            <div className='input-fields'>     
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setLast(e.target.value)} type="text" />
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFirst(e.target.value)} type="text" />
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} type="text" />
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)} type="text" />
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSkillLevel(e.target.value)} type="text" />
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" />
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="password" />
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} type="password" />
            </div>
        </div>
        <button>Create Account</button>
        <Link to={"/login"}  className='redirect-btn'><p>Already a member? Sign in here</p></Link>
      </form>
    </div>
  )
}

export default Register