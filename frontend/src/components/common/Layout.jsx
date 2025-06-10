import React from 'react'
import Navbar from './Header'
import Footer from './Footer'
import FloatingIcons from './FloatingIcons'
import './FloatingIcons.scss'

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <FloatingIcons />
    </div>
  )
}

export default Layout
