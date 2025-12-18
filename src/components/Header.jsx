import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../redux/slices/authSlice'
import '../styles/Header.scss'

const Header = ({ toggleSidebar }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const [open, setOpen] = useState(false)

    return (
        <nav>
            <div className="left-section">
                <i className="ri-menu-line hamburger" onClick={toggleSidebar}></i>
                <div className="nav-title">
                    <h1>Expense Tracker</h1>
                    <h4>Keep track, assess and enhance your financial performance</h4>
                </div>
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
                                <button onClick={() => dispatch(logoutUser())}>Logout</button>
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
