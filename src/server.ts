import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/official.routes";
import connectDB from "./config/official.db";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();
connectDB();
const port = process.env.PORT;

const app = express();
app.use(helmet());
app.use(cors());
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});
// express rate limiter ------
app.use("/api", limiter);

// Data Sanitization against NOSQL Query Injection---

app.use(bodyParser.json());
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
