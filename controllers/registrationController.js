// import Registration from "../models/registration.js";

// export const createRegistration = async (req, res) => {
//   const { name, email, number, courses, trainingMode } = req.body;

//   try {
//     const newRegistration = new Registration({
//       name,
//       email,
//       number,
//       courses,
//       trainingMode,
//     });

//     await newRegistration.save();
//     res.status(201).json({ message: "Registration saved successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to save registration", error });
//   }
// };

import Registration from "../models/registration.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const createRegistration = async (req, res) => {
  const { name, email, number, courses, trainingMode } = req.body;

  try {
    // Save the registration to the database
    const newRegistration = new Registration({
      name,
      email,
      number,
      courses,
      trainingMode,
    });

    await newRegistration.save();

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
      subject: "New Registration Received",
      text: `New Registration Details:
      Name: ${name}
      Email: ${email}
      Phone Number: ${number}
      Courses: ${courses}
      Training Mode: ${trainingMode}`,
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Failed to send email:", error);
        return res.status(500).json({ message: "Failed to send email", error });
      }
      console.log("Email sent successfully:", info.response);
      res
        .status(201)
        .json({ message: "Registration saved and email sent successfully" });
    });
  } catch (error) {
    console.error("Error saving registration:", error);
    res.status(500).json({ message: "Failed to save registration", error });
  }
};
