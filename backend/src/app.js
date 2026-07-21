const express = require("express");
const cors = require("cors");
const positionsRoutes = require("./routes/positionsRoutes");
const authRoutes = require("./routes/authRoutes");
const cvsRoutes = require("./routes/cvsRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/cvs", cvsRoutes);

module.exports = app;