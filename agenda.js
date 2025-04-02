
// const Agenda = require("agenda");
// const nodemailer = require("nodemailer");
// const mongoose = require("mongoose");
// const EmailSchedule = require("./models/EmailSchedule"); 

// // Connect to MongoDB
// const mongoConnectionString = process.env.MONGO_URI;
// const agenda = new Agenda({ db: { address: mongoConnectionString } });

// // Nodemailer Setup
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// // Define the job to send email
// agenda.define("send scheduled email", async (job) => {
//     const { emailId } = job.attrs.data;
//     const emailRecord = await EmailSchedule.findById(emailId);

//     if (!emailRecord) return;

//     try {
//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: emailRecord.email,
//             subject: emailRecord.subject,
//             text: emailRecord.body
//         });

//         // Update status after email is sent
//         emailRecord.status = "Sent";
//         emailRecord.sentAt = new Date();
//         await emailRecord.save();

//         console.log(` Email sent to ${emailRecord.email}`);
//     } catch (error) {
//         console.error(" Email sending failed:", error);
//     }
// });

// // Start agenda
// (async function () {
//     await agenda.start();
//     console.log("🔄 Agenda started");
// })();

// module.exports = agenda;




const Agenda = require("agenda");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const EmailSchedule = require("./models/EmailSchedule"); 

// Connect to MongoDB
const mongoConnectionString = process.env.MONGO_URI + "&tlsAllowInvalidCertificates=true";

const agenda = new Agenda({ 
    db: { 
        address: mongoConnectionString, 
        options: { tls: true }  // Ensuring TLS is enabled
    } 
});

// Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Define the job to send email
agenda.define("send scheduled email", async (job) => {
    const { emailId } = job.attrs.data;
    const emailRecord = await EmailSchedule.findById(emailId);

    if (!emailRecord) return;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: emailRecord.email,
            subject: emailRecord.subject,
            text: emailRecord.body
        });

        // Update status after email is sent
        emailRecord.status = "Sent";
        emailRecord.sentAt = new Date();
        await emailRecord.save();

        console.log(` Email sent to ${emailRecord.email}`);
    } catch (error) {
        console.error(" Email sending failed:", error);
    }
});

// Start agenda
(async function () {
    await agenda.start();
    console.log("🔄 Agenda started");
})();

module.exports = agenda;
