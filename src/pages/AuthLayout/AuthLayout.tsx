import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom';
function AuthLayout() {
  return (
    <div>
      <Link to={'/login'}>Login</Link>
      {' '}
      <Link to={'/register'}>Create Account</Link>
    </div>
  )
}

export default AuthLayout
