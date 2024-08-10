import express from "express";
import { createContact } from "../controllers/contactController.js";
import validateContactForm from "../middlewares/contactValidation.js";

const router = express.Router();

router.post("/contact", validateContactForm, createContact);

export default router;
