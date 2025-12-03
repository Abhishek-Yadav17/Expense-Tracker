import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Register.scss'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const registerForm = useRef()
  const { user, registerUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = registerForm.current.name.value
    const email = registerForm.current.email.value
    const password1 = registerForm.current.password1.value
    const password2 = registerForm.current.password2.value

    if (password1 !== password2) {
      alert("Password do not match")
      return
    }

    const userInfo = { name, email, password1, password2 }
    registerUser(userInfo)
  }

  return (
    <div className="register">
      <div className="register-card">
        <form ref={registerForm} onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" required placeholder="Enter name..." />

          <label>Email</label>
          <input type="email" name="email" required placeholder="Enter email..." />

          <label>Password</label>
          <input type="password" name="password1" placeholder="Enter password..." />

          <label>Confirm Password</label>
          <input type="password" name="password2" placeholder="Confirm password..." />

          <input type="submit" value="Register" className="btn" />
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
