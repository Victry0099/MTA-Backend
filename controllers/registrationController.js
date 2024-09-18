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

    // Email to the recipient (admin)
    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: `${process.env.RECIPIENT_EMAIL}, anilk.mtaindia@gmail.com`,
      subject: "New Registration Received",
      text: `New Registration Details:
      Name: ${name}
      Email: ${email}
      Phone Number: ${number}
      Courses: ${courses}
      Training Mode: ${trainingMode}`,
    };

    // Email to the user (thank you message)
    const mailOptionsUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Registering! We'll Be in Touch Soon",
      text: `Hi ${name},\n

Thank you for registering for the ${courses} at MTA-india. We're thrilled to have you join us!\n

Course Details:\n
 Course: ${courses}\n
 Training Mode: ${trainingMode}\n

Our team will be reaching out to you within the next 24 hours with all the necessary details and next steps.\n

If you have any immediate questions, feel free to  contact us at 9315636357.\n

Welcome aboard, and we look forward to helping you achieve your IT goals!\n

Best Regards,\n

Kavita Mam (Business Development)\n 
MTA-INDIA\n
91+ 9315636357`,
    };

    // Send email to the recipient (admin)
    transporter.sendMail(mailOptionsAdmin, (error, info) => {
      if (error) {
        console.error("Failed to send email to admin:", error);
        return res
          .status(500)
          .json({ message: "Failed to send email to admin", error });
      }

      // Send thank you email to the user
      transporter.sendMail(mailOptionsUser, (error, info) => {
        if (error) {
          console.error("Failed to send thank you email:", error);
          return res
            .status(500)
            .json({ message: "Failed to send thank you email", error });
        }

        // If both emails are sent successfully
        res
          .status(201)
          .json({ message: "Registration saved and emails sent successfully" });
      });
    });
  } catch (error) {
    console.error("Error saving registration:", error);
    res.status(500).json({ message: "Failed to save registration", error });
  }
};
