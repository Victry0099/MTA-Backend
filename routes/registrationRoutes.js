import express from "express";
import validateRegistrationForm from "../middlewares/registrationValidation.js";

import { createRegistration } from "../controllers/registrationController.js";

const router = express.Router();

router.post("/registration", validateRegistrationForm, createRegistration);

export default router;
