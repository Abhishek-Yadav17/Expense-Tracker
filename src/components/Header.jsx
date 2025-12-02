import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import '../styles/Header.scss'

const Header = () => {
    const navigate = useNavigate()
    const { user, logoutUser } = useAuth()

    return (
        <nav>
            <h1>Expense Tracker</h1>

            <div className="links">
                {user ? (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/profile">Profile</Link>

                        <button onClick={logoutUser} className="login-btn">Logout</button>
                    </>
                ) : (
                    <Link className="login-btn" to="/login">Login</Link>
                )}
            </div>
        </nav>
    )
}

export default Header
