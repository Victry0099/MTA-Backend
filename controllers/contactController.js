import Contact from "../models/contactModel.js";

export const createContact = async (req, res) => {
  const { name, email, number, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      number,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save contact", error });
  }
};

// import Contact from "../models/contactModel.js";
// import emailjs from "emailjs";

// const emailClient = emailjs.email.createClient({
//   user: "YOUR_USER_ID", // Replace with your EmailJS user ID
//   host: "smtp.emailjs.com",
//   ssl: true,
// });

// export const createContact = async (req, res) => {
//   const { name, email, number, message } = req.body;

//   try {
//     // Save contact information to MongoDB
//     const newContact = new Contact({
//       name,
//       email,
//       number,
//       message,
//     });

//     await newContact.save();

//     // EmailJS configuration
//     const emailParams = {
//       to: "YOUR_RECIPIENT_EMAIL", // Replace with the recipient's email address
//       from: "MTA INDIA <no-reply@mtaindia.com>", // Sender's email address
//       subject: "New Contact Form Submission",
//       text: `Name: ${name}\nEmail: ${email}\nPhone Number: ${number}\nMessage: ${message}`,
//     };

//     // Send email via EmailJS
//     emailClient
//       .sendMail({
//         ...emailParams,
//         user: "YOUR_USER_ID", // Replace with your EmailJS user ID
//         pass: "YOUR_USER_PASSWORD", // Replace with your EmailJS password
//         service: "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
//         template: "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
//       })
//       .then((response) => {
//         console.log("Email sent successfully:", response);
//       })
//       .catch((error) => {
//         console.error("Failed to send email:", error);
//       });

//     res.status(201).json({ message: "Contact saved successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to save contact", error });
//   }
// };
