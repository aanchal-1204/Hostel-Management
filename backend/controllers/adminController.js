import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();


// ✅ Add Student
export const addStudent = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      branch,
      semester,
      roomNumber,
      hostelNo,
      enrollmentNo,
      contact
    } = req.body;


    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { email }
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists"
      });
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create student
    const student = await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword,
        branch,
        semester,
        roomNumber,
        hostelNo,
        enrollmentNo,
        contact,
        role: "STUDENT",
        isVerified: true
      }
    });


    res.status(201).json({
      success: true,
      message: "Student added successfully",
      student
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};



// ✅ Get Verified Students
export const getVerifiedStudents = async (req, res) => {

  try {

    const students = await prisma.student.findMany({

      where: {
        isVerified: true
      },

      select: {
        id: true,
        name: true,
        email: true,
        branch: true,
        semester: true,
        roomNumber: true,
        hostelNo: true
      }

    });

    res.status(200).json({
      success: true,
      students
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};














/*
========================================
GET ALL COMPLAINTS
/api/admin/complaints
========================================
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


/*
====================================
GET ALL COMPLAINTS
====================================
*/
export const getAllComplaints = async (req, res) => {
  try {

    const complaints = await prisma.complaint.findMany({

      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            roomNumber: true
          }
        }
      },

      orderBy: {
        createdAt: "desc"
      }

    });

    res.status(200).json({
      success: true,
      complaints
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching complaints"
    });

  }
};



/*
====================================
GET ACTIVE COMPLAINTS
pending + in_progress
====================================
*/
export const getActiveComplaints = async (req, res) => {

  try {

    const complaints = await prisma.complaint.findMany({

      where: {
        status: {
          in: ["pending", "in_progress"]
        }
      },

      include: {
        student: {
          select: {
            name: true,
            roomNumber: true
          }
        }
      },

      orderBy: {
        createdAt: "desc"
      }

    });

    res.status(200).json({
      success: true,
      complaints
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching active complaints"
    });

  }

};




/*
====================================
GET RESOLVED COMPLAINTS
====================================
*/
export const getResolvedComplaints = async (req, res) => {

  try {

    const complaints = await prisma.complaint.findMany({

      where: {
        status: "resolved"
      },

      include: {
        student: {
          select: {
            name: true,
            roomNumber: true
          }
        }
      }

    });

    res.status(200).json({
      success: true,
      complaints
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching resolved complaints"
    });

  }

};




/*
====================================
UPDATE STATUS
====================================
*/
export const updateComplaintStatus = async (req, res) => {

  try {

    const complaintId = Number(req.params.id);

    const { status } = req.body;


    // Validate enum value
    const validStatus = ["pending", "in_progress", "resolved"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }


    const updatedComplaint = await prisma.complaint.update({

      where: {
        id: complaintId
      },

      data: {
        status,
        resolvedAt: status === "resolved" ? new Date() : null
      }

    });

    res.status(200).json({
      success: true,
      message: "Complaint status updated",
      complaint: updatedComplaint
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error updating complaint"
    });

  }

};