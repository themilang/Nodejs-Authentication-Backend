import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        minlength: [5, 'Minimum length for full name should be 5'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Minimum length for password should be 8 characters'],
    },
    conf_password:{
        type: String,
        required: [true, 'Password is required'],

    },

    role: {
        type: String,
        enum: ['Admin', 'Moderator', 'User'],
        default: 'User',
    },
    
    jwt: {
        type: String,
    },
    fcm: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
}, { timestamps: true });

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;
