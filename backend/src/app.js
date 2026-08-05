const express = require("express");
const cors = require("cors");
const positionsRoutes = require("./routes/positionsRoutes");
const authRoutes = require("./routes/authRoutes");
const cvsRoutes = require("./routes/cvsRoutes");
const attributeRoutes = require("./routes/attributeRoutes");
const userRoutes = require("./routes/userRoutes");
const templateRoutes = require("./routes/templateRoutes");
const profileRoutes = require("./routes/profileRoutes");
const salesforceRoutes = require("./routes/salesforceRoutes");
const odooRoutes = require("./routes/odooRoutes");
const powerAutomateRoutes = require("./routes/powerAutomateRoutes");
const app = express();
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.originalUrl);
  next();
});
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/attributes", attributeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/salesforce", salesforceRoutes);
app.use("/api/odoo", odooRoutes);
app.use("/api/power-automate", powerAutomateRoutes);
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "CV Management API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/cvs", cvsRoutes);

module.exports = app;
