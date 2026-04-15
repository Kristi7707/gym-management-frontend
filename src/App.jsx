import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Members from './pages/Members'
import Trainers from './pages/Trainers'
import Attendance from './pages/Attendance'
import Login from './pages/Login'

function App() {
  const [token, setToken] = useState(null)

  if (!token) {
    return <Login onLogin={(t) => setToken(t)} />
  }

  return (
    <BrowserRouter>
      <nav className="gym-navbar">
        <div className="gym-logo">
          <img src="/logogym.jpeg" alt="E28 Logo" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
          <div className="gym-logo-text">E28<span> Ladies Gym</span></div>
        </div>
        <div className="gym-nav-links">
          <NavLink to="/members">Members</NavLink>
          <NavLink to="/trainers">Trainers</NavLink>
          <NavLink to="/attendance">Attendance</NavLink>
          <button
            className="gym-btn gym-btn-secondary"
            style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            onClick={() => setToken(null)}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="gym-page">
        <Routes>
          <Route path="/" element={<Navigate to="/members" />} />
          <Route path="/members" element={<Members token={token} />} />
          <Route path="/trainers" element={<Trainers token={token} />} />
          <Route path="/attendance" element={<Attendance token={token} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App