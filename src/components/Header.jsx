import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import '../styles/Header.scss'

const Header = () => {
    const navigate = useNavigate()
    const { user, logoutUser } = useAuth()
    const [open, setOpen] = useState(false)

    return (
        <nav>
            <div className="nav-title">
            <h1>Expense Tracker</h1>
            <h4>Keep track, assess and enhance your financial performance</h4>
            </div>

            <div className="links">
                {user ? (
                    <>
                        <div className='user-box' onClick={() => setOpen(!open)}>
                            <img
                                src={`https://ui-avatars.com/api/?name=${user.name || 'U'}&background=4ade80&color=fff`}
                                alt='user'
                            />
                            <span>{user.name || 'User'}</span>
                            <i className='ri-arrow-down-s-line'></i>
                        </div>

                        {open && (
                            <div className='dropdown'>
                                <button onClick={logoutUser}>Logout</button>
                            </div>
                        )}
                    </>
                ) : (
                    <Link className="login-btn" to="/login">Login</Link>
                )}
            </div>
        </nav>
    )
}

export default Header
