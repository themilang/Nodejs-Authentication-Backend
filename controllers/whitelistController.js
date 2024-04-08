import whiteListEmailModel from "../models/whiteListModel.js";

export const whiteListEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Validate form data
    if (!email) {
      throw new Error("Email is required");
    }
    if (await whiteListEmailModel.findOne({ email: email })) {
        res.status(400).json({
            status: "failed",
            message: "Email Address Already added to Whitelist"
          });
      }
else
{
     // Create a new ContactFormModel instance
     const whiteListmail = new whiteListEmailModel({
        email
      });
  
      // Save the contact form data to the database
      await whiteListmail.save();
  
      // Send success response with status code 201
      res.status(200).json({
        status: "success",
        message: "Email successfully added to whitelist"
      });

}
   
  } catch (error) {
    // Handle duplicate key error
    
      // Send response with status code 400 for other errors
      console.error(error);
      res.status(400).json({
        status: "failed",
        message: error.message || "Unable to add email to whitelist"
      });
   
  }
};
