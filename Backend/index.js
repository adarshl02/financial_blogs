import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from './routes/auth.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth",authRouter);


app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const success = false;
  return res.status(statusCode).json({
    success,
    statusCode,
    message,
  });
});
