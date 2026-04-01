import { useState } from 'react'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (username === 'Krist' && password === 'gym123') {
      onLogin()
    } else {
      setError('Invalid username or password!')
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#0d0d0d'
    }}>
      <div className="gym-card" style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/logogymgit .jpeg" alt="E28 Logo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.5rem' }} />
          <div style={{
  fontFamily: 'Bebas Neue, sans-serif',
  fontSize: '2rem',
  letterSpacing: '3px',
  color: '#f0f0f0'
}}>E28<span style={{ color: '#9b59b6' }}> Ladies Gym</span></div>
          <div style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Admin Panel
          </div>
        </div>

        <div className="gym-card-title">Sign In</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            className="gym-input"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="gym-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          {error && (
            <div style={{ color: '#ff3d00', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}
          <button className="gym-btn" onClick={handleLogin} style={{ width: '100%' }}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login