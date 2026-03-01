// backend/app.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://crypto-proj.onrender.com"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", routes.userRoutes);

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ success: false, error: "API endpoint not found" });
  }
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

module.exports = app;