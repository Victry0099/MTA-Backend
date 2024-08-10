import Registration from "../models/registration.js";

export const createRegistration = async (req, res) => {
  const { name, email, number, courses, trainingMode } = req.body;

  try {
    const newRegistration = new Registration({
      name,
      email,
      number,
      courses,
      trainingMode,
    });

    await newRegistration.save();
    res.status(201).json({ message: "Registration saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save registration", error });
  }
};
