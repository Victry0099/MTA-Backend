import { body, validationResult } from "express-validator";

const validateContactForm = [
  body("name").notEmpty().withMessage("Full Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("number").isMobilePhone().withMessage("Valid mobile number is required"),
  body("message").notEmpty().withMessage("Message is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateContactForm;
