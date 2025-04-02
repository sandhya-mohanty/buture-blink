const mongoose = require("mongoose");

const EmailScheduleSchema = new mongoose.Schema({
    email: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    status: { type: String, enum: ["Scheduled", "Sent"], default: "Scheduled" },
    scheduledAt: { type: Date, required: true },
    sentAt: { type: Date }
});

module.exports = mongoose.model("EmailSchedule", EmailScheduleSchema);
