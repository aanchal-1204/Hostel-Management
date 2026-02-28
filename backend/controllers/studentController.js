
//  STUDENT DASHBOARD
export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    const fee = await prisma.fee.findFirst({
      where: { studentId },
    });   

    const complaintsCount = await prisma.complaint.count({
      where: { studentId },
    });

    const announcementsCount = await prisma.announcement.count();

    res.status(200).json({
      totalFees: fee?.total || 0,
      paidFees: fee?.paid || 0,
      pendingFees: fee?.pending || 0,
      complaintsCount,
      announcementsCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error loading dashboard" });
  }
};



//  STUDENT PROFILE
export const getStudentProfile = async (req, res) => {
  try {
    const studentId = Number(req.params.id);

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        name: true,
        email: true,
        roomNumber: true,
        course: true,
        year: true,
        contact: true,
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};


// FEES SECTION
export const getStudentFees = async (req, res) => {
  try {
    const studentId = Number(req.params.id);

    const fee = await prisma.fee.findFirst({
      where: { studentId },
    });

    if (!fee) {
      return res.status(404).json({ message: "Fees record not found" });
    }

    res.status(200).json(fee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fees data" });
  }
};



//ANNOUNCEMENTS
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcements" });
  }
};



//  COMPLAINT SECTION

// Submit Complaint
export const submitComplaint = async (req, res) => {
  try {
    const studentId = Number(req.params.id);
    const { title, description } = req.body;

    const complaint = await prisma.complaint.create({
      data: {
        title,
        description,
        studentId,
      },
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: "Error submitting complaint" });
  }
};


// Get Student Complaints
export const getStudentComplaints = async (req, res) => {
  try {
    const studentId = Number(req.params.id);

    const complaints = await prisma.complaint.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints" });
  }
};




// EXTENSION REQUEST

// Submit Extension Request
export const submitExtensionRequest = async (req, res) => {
  try {
    const studentId = Number(req.params.id);
    const { reason, tillDate } = req.body;

    const extension = await prisma.extensionRequest.create({
      data: {
        reason,
        tillDate: new Date(tillDate),
        studentId,
      },
    });

    res.status(201).json({
      message: "Extension request submitted",
      extension,
    });
  } catch (error) {
    res.status(500).json({ message: "Error submitting extension request" });
  }
};


// Get Student Extension Requests
export const getExtensionRequests = async (req, res) => {
  try {
    const studentId = Number(req.params.id);

    const requests = await prisma.extensionRequest.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching extension requests" });
  }
};