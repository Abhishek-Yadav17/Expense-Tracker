import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Sidebar.scss'

const Sidebar = () => {
    return (
        <aside className='sidebar'>
            <h1>Menu</h1>

            <div className='sb-menu'>
                <NavLink to='/'><i className='ri-dashboard-line'></i>Dashboard</NavLink>
                <NavLink to='/transactions'><i className='ri-list-check sb-icon'></i>Transactions</NavLink>
            </div>
        </aside>
    )
}

export default Sidebar
