import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Members from './pages/Members'
import Trainers from './pages/Trainers'
import Attendance from './pages/Attendance'

function App() {
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
        </div>
      </nav>

      <div className="gym-page">
        <Routes>
          <Route path="/members" element={<Members />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App