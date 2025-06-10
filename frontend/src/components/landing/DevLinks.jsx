import React from 'react'
import { Link } from 'react-router-dom'

const DevLinks = () => {
  return (
    <section id="dev-links" style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
      <h2>Development Links</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/dashboard" style={{ padding: '5px 10px', background: '#007bff', color: 'white', textDecoration: 'none' }}>Dashboard (No Login)</Link>
        <Link to="/dashboard/budget" style={{ padding: '5px 10px', background: '#28a745', color: 'white', textDecoration: 'none' }}>Budget Section</Link>
        <Link to="/dashboard/savings" style={{ padding: '5px 10px', background: '#dc3545', color: 'white', textDecoration: 'none' }}>Savings Section</Link>
        <Link to="/dashboard/chama" style={{ padding: '5px 10px', background: '#ffc107', color: 'white', textDecoration: 'none' }}>Chama Section</Link>
      </div>
    </section>
  )
}

export default DevLinks