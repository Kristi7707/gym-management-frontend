import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Members from './pages/Members'
import Trainers from './pages/Trainers'
import Attendance from './pages/Attendance'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/members">Members</Link> |
        <Link to="/trainers">Trainers</Link> |
        <Link to="/attendance">Attendance</Link>
      </nav>

      <Routes>
        <Route path="/members" element={<Members />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App