import express from "express";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});