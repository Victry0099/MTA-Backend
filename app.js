import express from "express";
import connectDb from "./db/db_connection.js";
import dotenv from "dotenv";
const app = express();
import contactRoutes from "./routes/contactRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import { corsOption } from "./constants/config.js";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();

app.use(cors(corsOption));
app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

connectDb(mongoUri);

app.use("/api/v1", contactRoutes);
app.use("/api/v1", registrationRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
