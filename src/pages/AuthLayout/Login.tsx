import React from 'react'

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
            const handleLoggingInUser = await fetch('http://localhost:2020/login', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(loginInfo),
            })
            const HandleLogin = await handleLoggingInUser.json()
            if(HandleLogin.status === '200'){
                window.location.href = '/home'
                console.log(HandleLogin, 'sucess')
                
            } else {
                console.log(HandleLogin, 'failure')
            }

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">Email</label>
            <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="password" />
        </div>
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login
