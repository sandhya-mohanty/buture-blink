const express = require("express");
const router = express.Router();
const EmailSchedule = require("../models/EmailSchedule");
const agenda = require("../agenda");
const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};

//  API to Schedule Email
router.post("/schedule-email", verifyToken, async (req, res) => {
    try {
        const { email, subject, body } = req.body;
        const scheduledAt = new Date(Date.now() + 60 * 60 * 1000); // Schedule for 1 hour later

        // Save to database
        const emailSchedule = new EmailSchedule({
            email,
            subject,
            body,
            scheduledAt
        });

        await emailSchedule.save();

        // Schedule the job in Agenda
        await agenda.schedule(scheduledAt, "send scheduled email", { emailId: emailSchedule._id });

        res.status(200).json({ message: "Email scheduled successfully", emailSchedule });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

module.exports = router;
