const express = require('express'); //Import the express dependency
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.json');
const PORT = config['PORT']
const itemRoutes = require('./routes/item');
const registerRoutes = require('./routes/register');
const listingRoutes = require('./routes/listing');

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

    app.use(cors({ origin: 'http://localhost:3000' }))
    app.get('/try', (req, res) => {
        res.send('Connected to try');
    });
    app.use('/api/item', itemRoutes);
    app.use('/api', registerRoutes);
    app.use('/api', listingRoutes);
    //Can add more routes here

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
});

module.exports = app;