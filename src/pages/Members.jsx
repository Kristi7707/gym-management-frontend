import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'https://gym-management-system-production-5dd2.up.railway.app'

function Members() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/members`)
      .then(response => setMembers(response.data))
      .catch(error => console.log(error))
  }, [])

  return (
    <div>
      <h1>Members</h1>
      {members.map(member => (
        <div key={member.id}>
          <p>{member.name} — {member.membershipType}</p>
        </div>
      ))}
    </div>
  )
}

export default Members