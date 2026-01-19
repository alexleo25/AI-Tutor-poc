require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Auth service running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Auth server running on port " + PORT);
});
