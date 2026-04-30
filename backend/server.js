const express = require("express");

const app = express();

app.use(express.json());

// Users routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// CV routes
const cvRoutes = require("./routes/cvRoutes");
app.use("/api/cvs", cvRoutes);

// Interview routes
const interviewRoutes = require("./routes/interviewRoutes");
app.use("/api/interviews", interviewRoutes);

// PORT
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});