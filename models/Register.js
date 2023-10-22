const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        verification: {
            type: String,
            required: true
        }
        
    },
    { collection: 'register'}
);

const Register = mongoose.model('Register', registerSchema);
module.exports = Register;