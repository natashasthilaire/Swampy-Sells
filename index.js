const express = require('express'); //Import the express dependency
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config.json');
const PORT = config['PORT']
const itemRoutes = require('./routes/item');
const registerRoutes = require('./routes/register');


//Probably need bodyParser ?
//TODO Add ROUTES!

const app = express();
mongoose.connect(config['DB_URI'], {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ origin: 'http://localhost:3000' }))
    app.get('/try', (req, res) => {
        res.send('Connected to try');
    });
    app.use('/api/item', itemRoutes);
    app.use('/api', registerRoutes);
    //app.use(cors({ origin: 'http://localhost:3000' }))
    //Can add more routes here
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
});

