import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Members from './pages/Members'
import Trainers from './pages/Trainers'
import Attendance from './pages/Attendance'
import Login from './pages/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <BrowserRouter>
      <nav className="gym-navbar">
        <div className="gym-logo">
          <div className="gym-logo-icon">🏋️</div>
          <div className="gym-logo-text">GYM<span>PRO</span></div>
        </div>
        <div className="gym-nav-links">
          <NavLink to="/members">Members</NavLink>
          <NavLink to="/trainers">Trainers</NavLink>
          <NavLink to="/attendance">Attendance</NavLink>
          <button
            className="gym-btn gym-btn-secondary"
            style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            onClick={() => setIsLoggedIn(false)}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="gym-page">
        <Routes>
          <Route path="/" element={<Navigate to="/members" />} />
          <Route path="/members" element={<Members />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App