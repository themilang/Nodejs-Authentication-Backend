import mongoose from "mongoose";


const ContactFormSchema = new mongoose.Schema({
   name: {
        type: String,
        required: [true, 'Full name is required'],
        minlength: [5, 'Minimum length for full name should be 5'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
       
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],

    },
    message: {
        type: String,
        required: [true, 'Message  is required'],
        minlength: [5, 'Minimum length for full name should be 5'],
    },
    
}, { timestamps: true });

const ContactFormModel = mongoose.model('ContactFormModel', ContactFormSchema);

export default ContactFormModel;
