import express from "express";
import { createCertificate, fetchCertificates } from "../controllers/certificateController.js";

const router = express.Router();

router.post("/create", createCertificate);
router.get("/fetch-all", fetchCertificates);

export default router;