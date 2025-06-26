const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
const helmet = require("helmet");
const { v4: uuidv4 } = require("uuid");

// Middlewares
const errorHandler = require("./middlewares/errorHandler");
const authMiddleware = require("./middlewares/authMiddleware");

// Routes
const authRoutes = require("./routes/authRoutes");
const checklistRoutes = require("./routes/checklistRoutes");
// const checklistItemRoutes = require("./routes/checklistItemRoutes");

// Basic middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.set("trust proxy", true);

// Assign request_id and clientIp for every request
app.use((req, res, next) => {
  req.client_ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress
  req.request_id = uuidv4();
  next();
});

// Optional logging middleware
app.use((req, res, next) => {
  console.log(
    `[${req.request_id}] ${req.method} ${req.originalUrl} from ${req.clientIp}`
  );
  next();
});

// Public routes
app.use("/api/auth", authRoutes);

// exlude token if routes start with prefix api/auth
app.use((req, res, next) => {
  if (req.path.startsWith("/api/auth")) {
    return next(); // Skip token validation for /api/auth/*
  }
  return authMiddleware(req, res, next); // Apply token check for others
});

// Protected routes (require auth)
app.use("/api/checklist", checklistRoutes);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
