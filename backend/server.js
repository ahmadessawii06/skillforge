require('dotenv').config();

const express = require("express");
const cors = require("cors");

const app = express();

const defaultOrigins = [
  "http://localhost:5173", "http://localhost:5174", "http://localhost:5175",
  "http://localhost:5176", "http://localhost:5177", "http://localhost:5178",
  "http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://127.0.0.1:5175",
  "http://127.0.0.1:5176", "http://127.0.0.1:5177", "http://127.0.0.1:5178",
].join(",");

const allowedOrigins = (process.env.FRONTEND_URL || defaultOrigins)
  .split(",")
  .map(origin => origin.trim());

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.use(express.json());

// Users routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const answerRoutes = require("./routes/answerRoutes");
const questionRoutes = require("./routes/questionRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const planRoutes = require("./routes/planRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
// CV routes
const cvRoutes = require("./routes/cvRoutes");
app.use("/api/cvs", cvRoutes);

// Interview routes
const interviewRoutes = require("./routes/interviewRoutes");
app.use("/api/interviews", interviewRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/analysis", analysisRoutes);
// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
