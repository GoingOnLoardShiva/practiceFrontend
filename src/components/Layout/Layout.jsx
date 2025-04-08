import React from 'react'
import Header from '../fixedComponent/Header'
import Footer from '../fixedComponent/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <header>
        <Header/>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout
