import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
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

    const existing = await prisma.student.findUnique({
      where: { email },
    });

    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.student.create({
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
        role: "STUDENT",
      },
    });

    res.status(201).json({
      message: "Student registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.status(400).json({ message: "ID and password required" });
    }

    let user = null;
    let role = null;

    // 1️⃣ Check Student
    user = await prisma.student.findUnique({
      where: { id: Number(id) },
    });

    if (user) {
      role = "STUDENT";
    } else {
      // 2️⃣ Check Admin
      user = await prisma.admin.findUnique({
        where: { id: Number(id) },
      });

      if (user) role = "ADMIN";
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid ID or password" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid ID or password" });
    }

    const accessToken = jwt.sign(
      { id: user.id, role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

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
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  });
};