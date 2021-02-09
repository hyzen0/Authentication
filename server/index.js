const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");

const cors = require("cors");

// Config dotev...
require("dotenv").config({
  path: "./config/config.env",
});

const app = express();

// Connect to database
connectDB();

// Load routes
const authRouter = require("./api/auth.route");

// Dev Logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  app.use(morgan("dev"));
}

// Use Routes
app.use("/api", authRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    msg: "Page not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
