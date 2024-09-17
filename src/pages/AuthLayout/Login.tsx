import React from 'react'
import { Link } from 'react-router-dom'
function Login() {
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    interface LoginInfo{
        email:string
        password:string
    }
    const loginInfo: LoginInfo ={
        email:email,
        password:password
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(loginInfo)
        try {
            const handleLoggingInUser = await fetch('http://localhost:2030/login', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(loginInfo),
            })
            const HandleLogin = await handleLoggingInUser.json()
            if(HandleLogin.status === '200'){
                window.localStorage.setItem('token', HandleLogin.token) 
                window.location.href = '/feed'
            } else {
                console.log(HandleLogin, 'failure')
                new Error('Cannot login')
                
            }

        } catch (error) {
            console.log(error)
            alert('Issue with credentials!')
        }
    }

  return (
    <div className='login-page'>
      < form onSubmit={handleSubmit} className='submit-form'>
      <h2 className='hero'>Login</h2>
        <div className='fields'>
{/*         <div className='input-titles'>
            <label htmlFor="email">Email</label>
            <label htmlFor="password">Password</label>
        </div> */}
        <div className='input-fields'> 
            <input placeholder='E-mail' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" />     
            <input placeholder='Password' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="password" />
        </div>
        </div>
        <button>Login</button>

        <Link to={"/register"} className='redirect-btn'><p>Not a member yet? Register here</p></Link>
      </form>
    </div>
  )
}

export default Login
