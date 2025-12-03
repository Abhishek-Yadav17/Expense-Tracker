import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import Header from './components/Header'
import Home from './pages/Public/Dashboard/Home'
import Profile from './pages/Public/Profile'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import './App.css'
import { AuthProvider } from './context/authContext'
import AdminLayout from './layout/AdminLayout'

function App() {

  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
