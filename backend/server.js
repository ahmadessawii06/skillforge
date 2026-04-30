const express = require("express");
require("dotenv").config();


const answerRoutes = require("./routes/answerRoutes");
const questionRoutes = require("./routes/questionRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const planRoutes = require("./routes/planRoutes");
const interviewRoutes = require("./routes/interviewRoutes");


const app = express();

app.use(express.json());


app.use("/api/answers", answerRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/interviews", interviewRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});