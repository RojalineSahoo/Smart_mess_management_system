import Notice from "../models/Notice.js";

export const createNotice = async (req, res) => {
  console.log("Notices called");
  try {
    const user = req.user;

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, description, priority, effectiveFrom } = req.body;

    if (!title || !description || !effectiveFrom) {
      return res.status(400).json({
        message: "Title, description and effective date are required"
      });
    }

    const notice = await Notice.create({
      title,
      description,
      priority,
      effectiveFrom: new Date(effectiveFrom),
      createdBy: user.id
    });

    return res.status(201).json({
      message: "Notice created successfully",
      notice
    });
  } catch (error) {
    console.error("Create notice error:", error.message);
    return res.status(500).json({
      message: error.message
    });
  }
};


export const getActiveNotices = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const notices = await Notice.find({
      effectiveFrom: { $lte: today }
    }).sort({ priority: -1, createdAt: -1 });

    return res.status(200).json(notices);
      } catch (error) {
      console.error("Create notice error:", error.message);
      return res.status(500).json({
        message: error.message
      });
    }
  }
