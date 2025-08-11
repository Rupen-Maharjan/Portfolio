import express from "express";
import { User_Info } from "../../database/schemas/export.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      fullname,
      title,
      about,
      exp,
      location,
      tagline,
      token,
    } = req.body;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token and extract user info
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Allow only admin role
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized: Admins only" });
    }

    // Validate required fields
    if (!fullname || !about || !exp || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userId = decoded.id;

    if (!userId) {
      return res.status(400).json({ message: "Invalid user ID in token" });
    }

    // Check if user info already exists
    const existingInfo = await User_Info.findOne({ where: { userId } });

    if (existingInfo) {
      // Update existing record
      await existingInfo.update({
        fullname,
        title,
        about,
        exp,
        location,
        tagline,
      });

      return res.status(200).json({ message: "Basic info updated", data: existingInfo });
    } else {
      // Create new record
      const newInfo = await User_Info.create({
        fullname,
        title,
        about,
        exp,
        location,
        tagline,
        userId,
      });

      return res.status(201).json({ message: "Basic info saved", data: newInfo });
    }
  } catch (error) {
    console.error("Error saving basic info:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
