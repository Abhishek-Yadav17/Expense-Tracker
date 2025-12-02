import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Login.scss'
import { useAuth } from '../context/authContext'

const Login = () => {
  const navigate = useNavigate()
  const { user, loginUser } = useAuth()
  const loginForm = useRef(null)

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = loginForm.current.email.value
    const password = loginForm.current.password.value

    const userInfo = { email, password }
    loginUser(userInfo)
  }

  return (
    <div className="login">
      <div className="login-card">
        <form ref={loginForm} onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" required placeholder="Enter email..." />

          <label>Password</label>
          <input type="password" name="password" placeholder="Enter password..." />

          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
