import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'https://gym-management-system-production-5dd2.up.railway.app'

function Members() {
  const [expiringMembers, setExpiringMembers] = useState([])
  const [members, setMembers] = useState([])
  const [editMember, setEditMember] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    membershipType: '',
    startDate: '',
    active: true
  })

  const fetchMembers = () => {
    axios.get(`${API_URL}/members`)
      .then(response => {
        setMembers(response.data)
        const today = new Date()
        const in7Days = new Date()
        in7Days.setDate(today.getDate() + 7)
        const expiring = response.data.filter(member => {
          if (!member.expiryDate) return false
          const expiry = new Date(member.expiryDate)
          return expiry <= in7Days
        })
        setExpiringMembers(expiring)
      })
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

  const handleEdit = (member) => {
    setEditMember(member)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    axios.put(`${API_URL}/members/${editMember.id}`, editMember)
      .then(() => {
        fetchMembers()
        setEditMember(null)
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <div className="gym-page-header">
        <div className="gym-page-title">MEM<span>BERS</span></div>
      </div>

      {expiringMembers.length > 0 && (
        <div style={{
          background: 'rgba(255, 61, 0, 0.15)',
          border: '1px solid #ff3d00',
          borderRadius: '12px',
          padding: '1rem 1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            color: '#ff3d00',
            fontWeight: '600',
            fontSize: '0.8rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>
            ⚠️ Membership Expiring Soon
          </div>
          {expiringMembers.map(member => (
            <div key={member.id} style={{ color: '#f0f0f0', fontSize: '0.9rem', padding: '2px 0' }}>
              <strong>{member.name}</strong> — expires on {new Date(member.expiryDate).toLocaleDateString()}
            </div>
          ))}
        </div>
      )}

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
          <select className="gym-select" name="membershipType" value={form.membershipType} onChange={handleChange}>
            <option value="">Select Membership Type</option>
            <option value="monthly">Monthly</option>
            <option value="3 months">3 Months</option>
            <option value="yearly">Yearly</option>
          </select>
          <input 
  className="gym-input" 
  type="date" 
  name="startDate" 
  value={form.startDate} 
  onChange={handleChange} 
/>
          <button className="gym-btn" type="submit">Add Member</button>
        </form>
      </div>

      {editMember && (
        <div className="gym-card">
          <div className="gym-card-title">Edit Member</div>
          <form className="gym-form" onSubmit={handleUpdate}>
            <input className="gym-input" placeholder="Full Name" value={editMember.name} onChange={e => setEditMember({...editMember, name: e.target.value})} />
            <input className="gym-input" placeholder="Email" value={editMember.email} onChange={e => setEditMember({...editMember, email: e.target.value})} />
            <input className="gym-input" placeholder="Phone" value={editMember.phone} onChange={e => setEditMember({...editMember, phone: e.target.value})} />
            <select className="gym-select" value={editMember.membershipType} onChange={e => setEditMember({...editMember, membershipType: e.target.value})}>
              <option value="monthly">Monthly</option>
              <option value="3 months">3 Months</option>
              <option value="yearly">Yearly</option>
            </select>
            <input
  className="gym-input"
  type="date"
  value={editMember.startDate || ''}
  onChange={e => setEditMember({...editMember, startDate: e.target.value})}
/>
            <button className="gym-btn" type="submit">Save Changes</button>
            <button className="gym-btn gym-btn-secondary" type="button" onClick={() => setEditMember(null)}>Cancel</button>
          </form>
        </div>
      )}

      <div className="gym-table-wrap">
        <table className="gym-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Membership</th>
              <th>Start Date</th>
              <th>Expiry Date</th>
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
                <td>{member.startDate ? new Date(member.startDate).toLocaleDateString() : '—'}</td>
                <td style={{ color: member.expiryDate && new Date(member.expiryDate) <= new Date(Date.now() + 7*24*60*60*1000) ? '#e74c3c' : '#f0f0f0' }}>
                  {member.expiryDate ? new Date(member.expiryDate).toLocaleDateString() : '—'}
                </td>
                <td>
                  <span className={`gym-badge ${member.active ? 'gym-badge-active' : 'gym-badge-inactive'}`}>
                    {member.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: '6px' }}>
                  <button className="gym-btn" onClick={() => handleEdit(member)}>
                    Edit
                  </button>
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