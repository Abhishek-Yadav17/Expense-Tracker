import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoutes = () => {
    const { user, loading } = useSelector(state => state.auth)

    if (loading) return null

    return user ? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateRoutes