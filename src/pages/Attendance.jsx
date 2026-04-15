import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'https://gym-management-system-production-5dd2.up.railway.app'

function Attendance({ token }) {
  const [members, setMembers] = useState([])
  const [memberId, setMemberId] = useState('')
  const [attendanceId, setAttendanceId] = useState('')
  const [records, setRecords] = useState([])
  const [searchId, setSearchId] = useState('')

  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    axios.get(`${API_URL}/members`, { headers })
      .then(response => setMembers(response.data))
      .catch(error => console.log(error))
  }, [])

  const handleCheckIn = () => {
    axios.post(`${API_URL}/attendance/checkin/${memberId}`, {}, { headers })
      .then(() => {
        alert('Checked in successfully!')
        setMemberId('')
      })
      .catch(error => console.log(error))
  }

  const handleCheckOut = () => {
    axios.put(`${API_URL}/attendance/checkout/${attendanceId}`, {}, { headers })
      .then(() => {
        alert('Checked out successfully!')
        setAttendanceId('')
      })
      .catch(error => console.log(error))
  }

  const handleSearch = () => {
    axios.get(`${API_URL}/attendance/member/${searchId}`, { headers })
      .then(response => setRecords(response.data))
      .catch(error => console.log(error))
  }

  return (
    <div>
      <div className="gym-page-header">
        <div className="gym-page-title">ATTEN<span>DANCE</span></div>
      </div>

      <div className="gym-stats">
        <div className="gym-stat">
          <div className="gym-stat-value">{records.length}</div>
          <div className="gym-stat-label">Records Found</div>
        </div>
        <div className="gym-stat">
          <div className="gym-stat-value">{records.filter(r => !r.checkOutTime).length}</div>
          <div className="gym-stat-label">Still In Gym</div>
        </div>
      </div>

      <div className="gym-card">
        <div className="gym-card-title">Check In</div>
        <div className="gym-form">
          <select className="gym-select" value={memberId} onChange={e => setMemberId(e.target.value)}>
            <option value="">Select Member</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
          <button className="gym-btn" onClick={handleCheckIn}>Check In</button>
        </div>
      </div>

      <div className="gym-card">
        <div className="gym-card-title">Check Out</div>
        <div className="gym-form">
          <input
            className="gym-input"
            placeholder="Attendance ID"
            value={attendanceId}
            onChange={e => setAttendanceId(e.target.value)}
          />
          <button className="gym-btn" onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>

      <div className="gym-card">
        <div className="gym-card-title">Search Attendance History</div>
        <div className="gym-form">
          <select className="gym-select" value={searchId} onChange={e => setSearchId(e.target.value)}>
            <option value="">Select Member</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
          <button className="gym-btn" onClick={handleSearch}>Search</button>
        </div>
      </div>

      {records.length > 0 && (
        <div className="gym-table-wrap">
          <table className="gym-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record.id}>
                  <td>{record.member.name}</td>
                  <td>{new Date(record.checkInTime).toLocaleString()}</td>
                  <td>{record.checkOutTime ? new Date(record.checkOutTime).toLocaleString() : '—'}</td>
                  <td>
                    <span className={`gym-badge ${!record.checkOutTime ? 'gym-badge-active' : 'gym-badge-inactive'}`}>
                      {!record.checkOutTime ? 'In Gym' : 'Left'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Attendance