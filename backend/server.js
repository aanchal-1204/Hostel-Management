const express = require("express");
const cors = require("cors");
require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);

/* Test route */
app.get("/", (req, res) => {
  res.send("Hostel Management Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});