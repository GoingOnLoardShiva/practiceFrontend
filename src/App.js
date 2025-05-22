import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Landing from './components/landing/Landing'
import AdminPost from './components/Panel/Admin/AdminPost'
import ContentPage from './components/Pages/ContentPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='Adminpost' element={<AdminPost />} />
          <Route path='Page/:_id' element={<ContentPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
