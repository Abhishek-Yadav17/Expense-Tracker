import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import '../../styles/Login.scss'
import { useAuth } from '../../context/authContext'

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Min 8 characters"),
  })

const Login = () => {
  const navigate = useNavigate()
  const { user, loginUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [])

  const onSubmit = async (data) => {
    try {
      await loginUser(data)
    } catch {
      alert("Invalid email or password")
    }
  }

  return (
    <div className="login">
      <div className="login-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email</label>
          <input {...register("email")} placeholder="Enter email..." />
          <p className="error">{errors.email?.message}</p>

          <label>Password</label>
          <input type="password" {...register("password")} placeholder="Enter password..." />
          <p className="error">{errors.password?.message}</p>

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
