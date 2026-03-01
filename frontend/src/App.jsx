import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Students";
import Complaints from "./pages/admin/Complaints";

function App() {
  return (
    <Routes>

      <Route path="/admin/dashboard" element={<Dashboard />} />

      <Route path="/admin/students" element={<Students />} />

      <Route path="/admin/complaints" element={<Complaints />} />

    </Routes>
  );
}

export default App;