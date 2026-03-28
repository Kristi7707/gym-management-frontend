import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'https://gym-management-system-production-5dd2.up.railway.app'

function Trainers() {
  const [trainers, setTrainers] = useState([])
  const [form, setForm] = useState({
    name: '',
    specialization: '',
    phone: '',
    active: true
  })

  const fetchTrainers = () => {
    axios.get(`${API_URL}/trainers`)
      .then(response => setTrainers(response.data))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchTrainers()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${API_URL}/trainers`, form)
      .then(() => {
        fetchTrainers()
        setForm({ name: '', specialization: '', phone: '', active: true })
      })
      .catch(error => console.log(error))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      axios.delete(`${API_URL}/trainers/${id}`)
        .then(() => fetchTrainers())
        .catch(error => console.log(error))
    }
  }

  return (
    <div>
      <div className="gym-page-header">
        <div className="gym-page-title">TRAIN<span>ERS</span></div>
      </div>

      <div className="gym-stats">
        <div className="gym-stat">
          <div className="gym-stat-value">{trainers.length}</div>
          <div className="gym-stat-label">Total Trainers</div>
        </div>
        <div className="gym-stat">
          <div className="gym-stat-value">{trainers.filter(t => t.active).length}</div>
          <div className="gym-stat-label">Active Trainers</div>
        </div>
      </div>

      <div className="gym-card">
        <div className="gym-card-title">Add New Trainer</div>
        <form className="gym-form" onSubmit={handleSubmit}>
          <input className="gym-input" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
          <input className="gym-input" name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} />
          <input className="gym-input" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <button className="gym-btn" type="submit">Add Trainer</button>
        </form>
      </div>

      <div className="gym-table-wrap">
        <table className="gym-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map(trainer => (
              <tr key={trainer.id}>
                <td>{trainer.id}</td>
                <td>{trainer.name}</td>
                <td>{trainer.specialization}</td>
                <td>{trainer.phone}</td>
                <td>
                  <span className={`gym-badge ${trainer.active ? 'gym-badge-active' : 'gym-badge-inactive'}`}>
                    {trainer.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button className="gym-btn gym-btn-secondary" onClick={() => handleDelete(trainer.id)}>
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

export default Trainers