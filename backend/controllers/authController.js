import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(
    { id, role},
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id,role},
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};


// ================= REGISTER =================
export const registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      enrollmentNo,
      course,
      branch,
      year,
      semester,
      roomNumber,
      hostelNo,
      contact,
      permanentAddress,
      parentName,
      parentNumber,
      LgName,
      LgNumber,
      LgAddress,
    } = req.body;

     if (!name || !email || !password || !enrollmentNo) {
      return res.status(400).json({
        message: "Name, email, password and enrollment number are required",
      });
    }

    const existingEmail = await prisma.student.findUnique({
      where: { email },
    });

    if (existingEmail)
      return res.status(400).json({ message: "Email already exists" });

    const existingEnrollment = await prisma.student.findUnique({
  where: { enrollmentNo },
});

if (existingEnrollment)
  return res.status(400).json({ message: "Enrollment number already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword,
        enrollmentNo,
        course,
        branch,
        year,
        semester,
        roomNumber,
        hostelNo,
        contact,
        permanentAddress,
        parentName,
        parentNumber,
        LgName,
        LgNumber,
        LgAddress,
      },
    });

    res.status(201).json({
      message: "Student registered successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({ message: "UserId and password required" });
    }

    let user = null;
    let role = null;

    // 🔹 1️⃣ Try Student (enrollmentNo)
    user = await prisma.student.findUnique({
      where: { enrollmentNo: userId },
    });

    if (user) {
      role = "STUDENT";
    } else {
      // 🔹 2️⃣ Try Admin (adminCode)
      user = await prisma.admin.findUnique({
        where: { adminCode: userId },
      });

      if (user) role = "ADMIN";
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user.id, role);

    const refreshToken = generateRefreshToken(user.id, role);

    res.status(200).json({
      accessToken,
      refreshToken,
      role,
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};


// ================= REFRESH TOKEN =================
export const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = jwt.sign(
      { id: decoded.id , role: decoded.role},
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  });
};