import express from "express";
import { createCertificate, deleteCertificate, fetchCertificates } from "../controllers/certificateController.js";

const router = express.Router();

router.post("/create", createCertificate);
router.get("/fetch-all", fetchCertificates);
router.delete("/delete/:id", deleteCertificate);

export default router;