import mongoose from "mongoose";


const whiteListEmailSchema = new mongoose.Schema({
  
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],

    },
   
    
}, { timestamps: true });

const whiteListEmailModel = mongoose.model('whiteListEmailModel', whiteListEmailSchema);

export default whiteListEmailModel;
