import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import PrivateRoutes from './utils/PrivateRoutes'
import Header from './components/Header'
import Home from './pages/Public/Dashboard/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import './App.css'
import AdminLayout from './layout/AdminLayout'
import Transaction from './pages/Public/Dashboard/Transaction'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/transactions" element={<Transaction />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
