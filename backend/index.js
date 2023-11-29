const express = require('express'); //Import the express dependency
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.json');
const PORT = config['PORT']
const itemRoutes = require('./routes/item');
const registerRoutes = require('./routes/register');
const flash = require('express-flash');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const User = require('./models/User');


const initializePassport = require('./auth/passportStrategy');
const Item = require('./models/Item');

//TODO Add ROUTES!

const app = express();
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
 
    const corsOptions ={
        origin:'http://localhost:3000', 
        credentials:true,            
        //optionSuccessStatus:200
    }

    const store = new MongoDBStore({
        uri: process.env.MONGODB_URL,
        collection: 'sessions'
    });

    store.on('error', function (error) {
        console.error(error)
    });

    app.use(
        expressSession({
            secret: process.env.secret,
            resave: false,
            saveUninitialized: false,
            store: store,
            cookie: { 
                secure: false,
                httpOnly: true,
                maxAge: 3600000
            },
        })
    );
    initializePassport(passport);

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(methodOverride('_method'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors(corsOptions));
   
    app.get('/try', (req, res) => {
        res.send('Connected to try');
    });
    app.use('/api/item', itemRoutes);
    app.use('/api', registerRoutes);
    app.use("/api/v1/product", itemRoutes);
    //Can add more routes here
    app.get('/api/auth', (req, res) => {
        if (req.isAuthenticated()) {
            console.log(`/api/auth called:`);
            res.status(200).json({ authenticated: true, user: req.user });
        } else {
            res.status(401).json({ authenticated: false, user: null });
        }
    })

    app.post('/api/login', passport.authenticate('local'), (req, res) => {
        // If the code reaches here, it means authentication was successful
        res.status(200).json({ message: 'Login successful' });
    });

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
    });

    app.get('/getItems', (req, res) => {
        Item.find()
        .then(items => res.json(items))
        .catch(err => res.json(err))
    })

    app.get('/getTextbooks', (req, res) => {
        Item.find({category:"Textbooks"})
        .then(items => res.json(items))
        .catch(err => res.json(err))
    })

    app.get('/getClothes', (req, res) => {
        Item.find({category:"Clothes"})
        .then(items => res.json(items))
        .catch(err => res.json(err))
    })

    app.get('/getGeneralDecor', (req, res) => {
        Item.find({category:"General Decor"})
        .then(items => res.json(items))
        .catch(err => res.json(err))
    })

    app.get('/getFurniture', (req, res) => {
        Item.find({category:"Furniture"})
        .then(items => res.json(items))
        .catch(err => res.json(err))
    })

    app.get('/getAppliances', (req, res) => {
        Item.find({category:"Appliances"})
        .then(items => res.json(items))
        .catch(err => res.json(err))
    })

    app.get('/getTickets', (req, res) => {
        Item.find({category:"Tickets"})
        .then(items => res.json(items))
        .catch(err => res.json(err))
    })

    app.get('/getOther', (req, res) => {
        Item.find({category:"Other"})
        .then(items => res.json(items))
        .catch(err => res.json(err))
    })

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })

});

module.exports = app;