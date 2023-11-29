const Register = require('../models/Register');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const hasher = require('../services/utils/hash');
const express = require("express");
const app = express();
require('dotenv').config()

exports.registerUser = async (req, res) => {
    try {
        const {firstName, lastName, email, password, location} = req.body
        console.log();
        console.log(firstName, lastName, email, password, location);
        console.log();
       
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const alreadyRegistered = await Register.findOne({ email: email });
        if (alreadyRegistered) {
            alreadyRegistered.verification = verificationCode;
            await alreadyRegistered.save();
        } else {
            const newRegistration = new Register(
                {
                    email: email,
                    verification: verificationCode
                }
            );
            await newRegistration.save();
            const hashedPass = await hasher(password);
            const newUser = new User(
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPass,
                    location: location
                }
            );
            await newUser.save();
        }

        const transporter = nodemailer.createTransport(
            {
                 service: 'Gmail',
                auth: {
                    user: 'swampysellsuf@gmail.com',
                    pass: process.env.GMAIL_PASSWORD
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

exports.getRegisteredUser = async(req, res) => {
    try {
        const { email, code } = req.query;
        const bool = await Register.find({email: email, verification: code });
        if (bool.length) {
            //may need to send as json? res.status(200).json(true) ?
            res.status(200).send(true)
        } else {
            res.status(400).send(false)
        }
    } catch(error) {
        console.error(error)
        res.status(500).send(false)
    }
}



