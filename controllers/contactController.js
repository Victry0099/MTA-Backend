// import Contact from "../models/contactModel.js";

// export const createContact = async (req, res) => {
//   const { name, email, number, message } = req.body;

//   try {
//     const newContact = new Contact({
//       name,
//       email,
//       number,
//       message,
//     });

//     await newContact.save();
//     res.status(201).json({ message: "Contact saved successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to save contact", error });
//   }
// };

import Contact from "../models/contactModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const createContact = async (req, res) => {
  const { name, email, number, message } = req.body;

  try {
    // Save the contact to the database
    const newContact = new Contact({
      name,
      email,
      number,
      message,
    });

    await newContact.save();

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use your email service provider
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Set up email data
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: "New Contact Message",
      text: `Name: ${name}\nEmail: ${email}\nNumber: ${number}\nMessage: ${message}`,
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Failed to send email:", error);
        return res.status(500).json({ message: "Failed to send email", error });
      }
      // console.log("Email sent successfully:", info.response);
      res
        .status(201)
        .json({ message: "Contact saved and email sent successfully" });
    });
  } catch (error) {
    // console.error("Error saving contact:", error);
    res.status(500).json({ message: "Failed to save contact", error });
  }
};
