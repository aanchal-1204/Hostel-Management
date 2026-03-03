import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getAllStudents } from "../../services/adminApi";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getAllStudents();
      setStudents(Array.isArray(res.data) ? res.data : res.data.students || []);
    } catch (error) {
      console.error(error);
      setStudents([]);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">Hostel Students</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Semester</th>
              <th className="p-3">Enrollment No</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.branch}</td>
                <td className="p-3">{student.semester}</td>
                <td className="p-3">{student.enrollmentNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-125 p-6 relative">
            
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {selectedStudent.name}'s Details
            </h2>

            <div className="space-y-2">
              <p><strong>Enrollment No:</strong> {selectedStudent.enrollmentNo}</p>
              <p><strong>Department:</strong> {selectedStudent.branch}</p>
              <p><strong>Semester:</strong> {selectedStudent.semester}</p>
              <p><strong>Room Number:</strong> {selectedStudent.roomNumber}</p>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Phone:</strong> {selectedStudent.phone}</p>
              <p><strong>Address:</strong> {selectedStudent.address}</p>
              <p><strong>Guardian Name:</strong> {selectedStudent.guardianName}</p>
              <p><strong>Guardian Phone:</strong> {selectedStudent.guardianPhone}</p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Students;