const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ngo: { type: mongoose.Schema.Types.ObjectId, ref: "NGO", required: true }, // Corrected reference
    amount: { type: Number, required: true },
    transactionHash: { type: String, required: true }, // Blockchain transaction ID
    milestone: { type: String, default: "Pending" }, // Ex: "Food Distributed"
    impactReport: { type: String, default: "Not available" },
    createdAt: { type: Date, default: Date.now }
});

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
