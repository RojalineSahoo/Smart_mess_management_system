import Menu from "../models/Menu.js";

export const uploadMenuForDate = async (req, res, next) => {
  try {
    const user = req.user;

    // Admin only
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { date, breakfast, lunch, dinner } = req.body;

    if (!date || !breakfast || !lunch || !dinner) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize date
    const menuDate = new Date(date);
    menuDate.setHours(0, 0, 0, 0);

    // Prevent duplicate menu
    const existingMenu = await Menu.findOne({ date: menuDate });
    if (existingMenu) {
      return res
        .status(409)
        .json({ message: "Menu already exists for this date" });
    }

    const menu = await Menu.create({
      date: menuDate,
      breakfast,
      lunch,
      dinner,
      uploadedBy: user.id
    });

    return res.status(201).json({
      message: "Menu uploaded successfully",
      menu
    });
  } catch (error) {
    next(error);
  }
};

export const getMenuByDate = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // Normalize date
    const menuDate = new Date(date);
    menuDate.setHours(0, 0, 0, 0);

    const menu = await Menu.findOne({ date: menuDate });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found for this date" });
    }

    return res.status(200).json(menu);
  } catch (error) {
    next(error);
  }
};
