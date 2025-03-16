const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware");
const Donation = require("../models/Donation");
const User = require("../models/User"); // ✅ Import User model

const router = express.Router();

// 💰 Record a New Donation (User Donating to NGO)
router.post("/donate", authMiddleware, async (req, res) => {
    try {
        const { ngoId, amount, transactionHash } = req.body;

        console.log("Received donation request:", req.body);

        if (!ngoId || !amount || !transactionHash) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Check if ngoId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(ngoId)) {
            return res.status(400).json({ message: "Invalid NGO ID format" });
        }
        
        // ✅ Check if NGO exists in User collection and has role "ngo"
        const ngo = await User.findById(ngoId);
        if (!ngo || ngo.role !== "ngo") {
            return res.status(404).json({ message: "NGO not found" });
        }

        // ✅ Ensure req.user exists
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        // ✅ Create a new donation
        const donation = new Donation({
            donor: new mongoose.Types.ObjectId(req.user.userId),
            ngo: new mongoose.Types.ObjectId(ngoId),
            amount,
            transactionHash
        });

        console.log("Saving donation:", donation);
        await donation.save();

        res.status(201).json({ message: "Donation recorded successfully", donation });
    } catch (error) {
        console.error("Donation Error:", error);
        res.status(500).json({ message: "Error processing donation", error: error.message });
    }
});

module.exports = router;
