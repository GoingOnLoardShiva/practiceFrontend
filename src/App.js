import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Landing from './components/landing/Landing'
import AdminPost from './components/Panel/Admin/AdminPost'
import ContentPage from './components/Pages/ContentPage'
import AdminLogin from './components/Panel/Admin/AdminLogin'
import Ssucess from './components/Pages/Ssucess'
import Services from './components/Pages/Services'
import About from './components/Pages/About'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='Adminpost' element={<AdminPost />} />
          <Route path='Page/:_id' element={<ContentPage />} />
          <Route path='AdminLogin' element={<AdminLogin />} />
          <Route path='Ssucess' element={<Ssucess />} />
          <Route path='Services' element={<Services />} />
          <Route path='About' element={<About />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
