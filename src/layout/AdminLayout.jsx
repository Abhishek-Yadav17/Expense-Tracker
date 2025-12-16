import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import './AdminLayout.scss'

const AdminLayout = () => {
  return (
    <div className='dashboard-layout'>
      <div className='dashboard-body'>
        <Sidebar />
        <main className='dashboard-content'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
