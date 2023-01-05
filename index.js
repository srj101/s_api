import express from "express";
import dotenv from "dotenv";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import sportRoute from "./routes/sports.js";
import communityRoute from "./routes/community.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { verifyToken } from "./utils/verifyToken.js";

const app = express();
dotenv.config();

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", verifyToken, userRoute);
app.use("/api/v1/post", verifyToken, postRoute);
app.use("/api/v1/sport", verifyToken, sportRoute);
app.use("/api/v1/community", verifyToken, communityRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT, () => {
  console.log("Connected to backend.");
});
