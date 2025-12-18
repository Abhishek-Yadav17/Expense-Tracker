import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/Register.scss'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/slices/authSlice'

const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    password1: z.string().min(8, "Min 8 characters"),
    password2: z.string().min(8),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  })

const Register = () => {
 const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user])

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap()
    } catch (err) {
      alert(err.message || "User already exists")
    }
  }

  return (
    <div className="register">
      <div className="register-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
          <input {...register("name")} placeholder="Enter name..." />
          <p className="error">{errors.name?.message}</p>

          <label>Email</label>
          <input {...register("email")} placeholder="Enter email..." />
          <p className="error">{errors.email?.message}</p>

          <label>Password</label>
          <input type="password" {...register("password1")} placeholder="Enter password..." />
          <p className="error">{errors.password1?.message}</p>

          <label>Confirm Password</label>
          <input type="password" {...register("password2")} placeholder="Confirm password..." />
          <p className="error">{errors.password2?.message}</p>

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
