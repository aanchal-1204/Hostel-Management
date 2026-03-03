import React from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-6 hidden md:block">

        <h2 className="text-2xl font-bold mb-8">🎓 Student Panel</h2>

        <nav className="space-y-4">
          <Link to="/student/dashboard" className="block hover:text-gray-200">
            Dashboard
          </Link>

          <Link to="/student/complaints" className="block hover:text-gray-200">
            Complaints
          </Link>

          <Link to="/student/extensions" className="block hover:text-gray-200">
            Extension Requests
          </Link>

          <Link to="/student/profile" className="block hover:text-gray-200">
            Profile
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {children}
      </div>

    </div>
  );
};

export default StudentLayout;