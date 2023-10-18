const User = require('../models/User');
const nodemailer = require('nodemailer');

exports.registerUser = async (req, res) => {
    try {
        const email  = req.body.email;
        console.log();
        console.log(email)
        console.log();
       
        const verificationCode = 1011;
        const transporter = nodemailer.createTransport(
            {
                service: 'Gmail',
                auth: {
                    user: 'swampysellsuf@gmail.com',
                    pass: 'bfis kwyb yzmq ferm'
                }

            }
        );
        const mailOptions = {
            from: 'swampysellsuf@gmail.com',
            to: email,
            subject: 'Email Verification Code',
            text: `Verification code is ${verificationCode}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send('Failed to send verification email')
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Verification email sent');
            }
        });

        
    } catch (error) {
        console.error(`The error is ${error}`)
        return res.status(500).send('Error');
    }
    
}