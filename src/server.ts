import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/official.routes";
import connectDB from "./config/official.db";
dotenv.config();
connectDB();
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
