import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Dashboard from './Dashboard.jsx'
import StudentDashboard from './pages/student/StudentDashboard.jsx'

import LoginPage from './Login.jsx'
import StudentAnnouncements from './pages/student/StudentAnnouncement.jsx'
import ExtensionRequest from './pages/student/ExtensionRequest.jsx'

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Students from "./pages/admin/Students.jsx";
import Complaints from "./pages/admin/Complaints.jsx";
import Announcements from "./pages/admin/Annoucements.jsx";

function App() {
  return (
    <>
        <Routes>
         <Route path="/admin/dashboard" element={<AdminDashboard />} />

      <Route path="/admin/students" element={<Students />} />
      <Route path="/admin/announcements" element={<Announcements />} />

      <Route path="/admin/complaints" element={<Complaints />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/announcements" element={<StudentAnnouncements />} />
          <Route path="/student/extensionRequest" element={<ExtensionRequest />} />
        </Routes>
    </>
  )
}

export default App;