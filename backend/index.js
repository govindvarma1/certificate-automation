import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import certificateRouter from "./routes/CertificateRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.status(200).json({msg: "You are on home route"});
})

app.use("/certificates", certificateRouter);

async function DBConnect(req, res) {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to database succesfully");
    } catch (err) {
        console.error(`The following error occured: ${err}`);
    }
}
DBConnect();

app.listen(process.env.PORT, (req, res) => {
    console.log(`server is running on port ${process.env.PORT}`);
})