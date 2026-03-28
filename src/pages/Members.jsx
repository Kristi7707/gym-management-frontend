import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'https://gym-management-system-production-5dd2.up.railway.app'

function Members() {
  const [members, setMembers] = useState([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    membershipType: '',
    active: true
  })

  const fetchMembers = () => {
    axios.get(`${API_URL}/members`)
      .then(response => setMembers(response.data))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${API_URL}/members`, form)
      .then(() => {
        fetchMembers()
        setForm({ name: '', email: '', phone: '', membershipType: '', active: true })
      })
      .catch(error => console.log(error))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      axios.delete(`${API_URL}/members/${id}`)
        .then(() => fetchMembers())
        .catch(error => console.log(error))
    }
  }

  return (
    <div>
      <div className="gym-page-header">
        <div className="gym-page-title">MEM<span>BERS</span></div>
      </div>

      <div className="gym-stats">
        <div className="gym-stat">
          <div className="gym-stat-value">{members.length}</div>
          <div className="gym-stat-label">Total Members</div>
        </div>
        <div className="gym-stat">
          <div className="gym-stat-value">{members.filter(m => m.active).length}</div>
          <div className="gym-stat-label">Active Members</div>
        </div>
      </div>

      <div className="gym-card">
        <div className="gym-card-title">Add New Member</div>
        <form className="gym-form" onSubmit={handleSubmit}>
          <input className="gym-input" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
          <input className="gym-input" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input className="gym-input" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input className="gym-input" name="membershipType" placeholder="Membership Type" value={form.membershipType} onChange={handleChange} />
          <button className="gym-btn" type="submit">Add Member</button>
        </form>
      </div>

      <div className="gym-table-wrap">
        <table className="gym-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Membership</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>{member.membershipType}</td>
                <td>
                  <span className={`gym-badge ${member.active ? 'gym-badge-active' : 'gym-badge-inactive'}`}>
                    {member.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button className="gym-btn gym-btn-secondary" onClick={() => handleDelete(member.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Members