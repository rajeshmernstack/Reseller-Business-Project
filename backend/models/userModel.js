const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect('mongodb://localhost:27017/resellerbusiness');
}

connectDB();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    userRole: {
        type: Number,
        required: true,
        default: 1,
    },
    totalCredits: {
        type: Number,
        required: true,
        default: 0
    },
    usedCredits: {
        type: Number,
        required: true,
        default: 0
    },
    remainingCredits: {
        type: Number,
        required: true,
        default: 0
    },
    userCreatedTime: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;