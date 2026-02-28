import express from "express";

import {
  addStudent,
  getVerifiedStudents
} from "../controllers/adminController.js";


import {
  getAllComplaints,
  getActiveComplaints,
  getResolvedComplaints,
  updateComplaintStatus
} from "../controllers/adminController.js";
const router = express.Router();


// Add student
router.post("/add-student", addStudent);


// Get verified students
router.get("/students", getVerifiedStudents);
// Get all complaints
router.get("/complaints", getAllComplaints);

// Get active complaints
router.get("/complaints/active", getActiveComplaints);

// Get resolved complaints
router.get("/complaints/resolved", getResolvedComplaints);

// Update complaint status
router.put("/complaints/:id", updateComplaintStatus);

export default router;