import ContactFormModel from "../models/ContactFormModel.js";

export const ContactForm = async (req, res) => {
  const { email, name, message } = req.body;

  try {
    // Validate form data
    if (!email || !name || !message) {
      throw new Error("All fields are required");
    }

    // Create a new ContactFormModel instance
    const contactForm = new ContactFormModel({
      email,
      name,
      message
    });

    // Save the contact form data to the database
    await contactForm.save();

    // Send success response
    res.status(200).json({
      status: "success",
      message: "Message successfully sent"
    });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res.status(400).json({
        status: "failed",
        message: "Message Already Sent Form This Email Address "
      });
    } else {
      // Handle other errors
      console.error(error);
      res.status(400).json({
        status: "failed",
        message: error.message || "Unable to send message"
      });
    }
  }
};
