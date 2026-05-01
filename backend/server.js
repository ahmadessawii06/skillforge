require('dotenv').config();

const express = require("express");

const app = express();

app.use(express.json());

// Users routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const answerRoutes = require("./routes/answerRoutes");
const questionRoutes = require("./routes/questionRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const planRoutes = require("./routes/planRoutes");
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
// PORT
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});