import express from "express";
import {
  getStudentDashboard,
  getStudentProfile,
  getStudentFees,
  getAnnouncements,
  submitComplaint,
  getStudentComplaints,
  submitExtensionRequest,
  getExtensionRequests,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/dashboard/:id", getStudentDashboard);
router.get("/profile/:id", getStudentProfile);
router.get("/fees/:id", getStudentFees);
router.get("/announcements", getAnnouncements);

router.post("/complaint", submitComplaint);
router.get("/complaint/:id", getStudentComplaints);

router.post("/extension", submitExtensionRequest);
router.get("/extension/:id", getExtensionRequests);

export default router;