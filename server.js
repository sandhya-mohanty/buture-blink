// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
// const emailRoutes = require("./routes/emailRoutes");
// const authRoutes = require("./routes/authRoutes");

// const app = express();

// // Apply middleware first - CORS needs to be applied before routes
// // app.use(cors({ 
// //   origin: "http://localhost:5173", // Adjust this based on your frontend URL
// //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// //   credentials: true,
// //   allowedHeaders: "Content-Type,Authorization"
// // }));
// // app.use(cors({
// //   origin: "http://localhost:5173",
// //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// //   allowedHeaders: ["Content-Type", "Authorization"],
// // }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
// app.use(cors());
// // app.options("*", cors());
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// // Then apply routes
// app.use("/email", emailRoutes);
// app.use("/user", authRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB Connected"))
// .catch((err) => console.error("MongoDB Connection Error:", err.message));

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();


const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const emailRoutes = require("./routes/emailRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors({
  origin: "https://tranquil-starship-d82cd2.netlify.app", // Allow frontend URL
  credentials: true  // Allow cookies & authentication headers
}));
// // CORS configuration - apply before any routes
// app.use(cors({
//   origin: "*"
 
// }));
// app.use((req,res,next)=>{
// res.setHeader()
// })

// Handle preflight requests for all routes
// app.options("*", cors());

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/email", emailRoutes);
app.use("/user", authRoutes);
app.get("/",(req,res)=>{
  res.json({message:"hellow world backend"})
})
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err.message));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
