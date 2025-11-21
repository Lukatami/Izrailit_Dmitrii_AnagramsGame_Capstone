import express from "express";
import User from "../models/User.js";
import GameSession from "../models/GameSession.js";
import { authRequired } from "../middleware/authRequired.js";

const router = express.Router();

// GET route for user information
router.get("/me", authRequired, async (req, res) => {
  try {
    // Find existing user by Id
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      id: user._id,
      name: user.name,
      avatarUrl: user.avatarUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT route
router.put("/me", authRequired, async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.userId;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Name is required and cannot be empty",
      });
    }

    if (name.trim().length > 50) {
      return res.status(400).json({
        success: false,
        error: "Name is too long (max 50 characters)",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: name.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Name updated successfully",
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        avatarUrl: updatedUser.avatarUrl,
      },
    });
  } catch (error) {
    console.error("Error updating user name:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// DELETE route for user and all associated gameSessions
router.delete("/me", authRequired, async (req, res) => {
  try {
    const userId = req.userId;

    // Check existing user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Delete all GameSessions associated with user
    await GameSession.deleteMany({ userId });
    // Delete user
    await User.findByIdAndDelete(userId);

    res.json({
      success: true,
      message: "User and all associated game sessions have been deleted",
    });
  } catch (error) {
    console.error("Error deleting user and sessions:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

export default router;
