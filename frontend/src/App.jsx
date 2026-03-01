import React, { useState } from 'react'
import Dashboard from './Dashboard.jsx'
import StudentDashboard from './pages/student/StudentDashboard.jsx'
import { Router, Route, Routes } from 'react-router-dom'
import LoginPage from './Login.jsx'
import StudentAnnouncements from './pages/student/StudentAnnouncement.jsx'
import ExtensionRequest from './pages/student/ExtensionRequest.jsx'


function App() {


  return (
    <>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/announcements" element={<StudentAnnouncements />} />
          <Route path="/extensionrequest" element={<ExtensionRequest />} />
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        </Routes>
    </>
  )
}

export default App
