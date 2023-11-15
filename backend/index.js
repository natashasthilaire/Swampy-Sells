const express = require('express'); //Import the express dependency
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.json');
const PORT = config['PORT']
const Item = require('./models/Item');
const itemRoutes = require('./routes/item');
const registerRoutes = require('./routes/register');
const User = require('./models/User');
const { MongoDBCollectionNamespace, Db } = require('mongodb');


//Probably need bodyParser ?
//TODO Add ROUTES!

const app = express();
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    // app.use(express.json());
    // app.use(express.urlencoded({ extended: true }));
    // app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    //const cors = require('cors');
    const corsOptions ={
        origin:'http://localhost:3000', 
        credentials:true,            
        optionSuccessStatus:200
    }
    app.use(cors(corsOptions));
   
    app.get('/try', (req, res) => {
        res.send('Connected to try');
    });
    app.use('/api/item', itemRoutes);
    app.use('/api', registerRoutes);
    //Can add more routes here
    app.listen(3001, () => {
        console.log(`Server listening on port ${PORT}`)
    })
    
    app.post("/login", (req, res) => {
        const {email, password} = req.body;
        User.findOne({email: email}).then(async user => {
            if (user) {
                const passwordsMatch = await bcrypt.compare(password, user.password)
                if (passwordsMatch) {
                    res.json("Success");
                } else {
                    res.json("Incorrect password");
                }
            } else {
                res.json("No existing record");
            }
        })
    })  

    app.post("/forgot", (req, res) => {
        const {email} = req.body;
        User.findOne({email: email}).then(user => {
            if (!user) {
                return res.send({Status: "User not existed"})
            } 
            const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
            const transporter = nodemailer.createTransport(
                {
                     service: 'Gmail',
                    auth: {
                        user: 'swampysellsuf@gmail.com',
                        pass: process.env.GMAIL_PASSWORD
                    }
    
                }
            );
            //3000 works
            const mailOptions = {
                from: 'swampysellsuf@gmail.com',
                to: email,
                subject: 'Reset Password Link',
                text: `http://localhost:3000/reset/${user._id}/${token}`
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
    
        })
    })  

    app.post('/reset/:id/:token', (req, res) => {
        const {id, token} = req.params
        const {password} = req.body
        console.log('New Password', password)
    
        jwt.verify(token, "jwt_secret_key", (err, decoded) => {
            if(err) {
                return res.json({Status: "Error with token"})
            } else {
                bcrypt.hash(password, 12)
                .then(hash => {
                    User.findByIdAndUpdate({_id: id}, {password: hash})
                    .then(u => res.send({Status: "Success"}))
                    .catch(err => res.send({Status: err}))
                })
                .catch(err => res.send({Status: err}))
            }
        })
    })

    /*
    db.products.insert(
   [
     { _id: 11, item: "pencil", qty: 50, type: "no.2" },
     { item: "pen", qty: 20 },
     { item: "eraser", qty: 25 }
   ]
    ) 
    */
    app.post('/items', (req, res) => {
        
        Item.create("Textbook", "a", "b", "c");
    })
});

