import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Sidebar.scss'

const Sidebar = () => {
    return (
        <aside className='sidebar'>
            <h1>Dashboard</h1>

            <div className='sb-menu'>
                <NavLink to='/'><i className='ri-dashboard-line'></i>Dashboard</NavLink>
                <NavLink to='/profile'><i className='ri-user-3-line'></i>Profile</NavLink>
            </div>
        </aside>
    )
}

export default Sidebar
