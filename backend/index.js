const express = require('express'); //Import the express dependency
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.json');
const PORT = config['PORT']
const itemRoutes = require('./routes/item');
const registerRoutes = require('./routes/register');
//const messageRoutes = require('./routes/message'); //import router module for handling message-related routes

//messaging: 
const http = require('http'); 
const {Server} = require('socket.io'); 
const messageRoutes = require('./routes/message');
 

//Probably need bodyParser ?
//TODO Add ROUTES!

const app = express();
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
        app.use(express.json());
        // app.use(express.urlencoded({ extended: true }));
        // app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(cors({
            origin: 'http://localhost:3000', 
            optionsSuccessStatus: 200,
            credentials: true,
        }))
        app.get('/try', (req, res) => {
            res.send('Connected to try');
        });
        app.use('/api/item', itemRoutes);
        app.use('/api', registerRoutes);
        //Can add more routes here



        const server = app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        }) 

        //for messaging page: 
        //this should allow us to work w/socketIO
        const io = new Server(server, {
            cors: {
                origin: "http://localhost:3000", 
                methods: ["GET", "POST"],
            }
        }) 
        app.use('api/messages', messageRoutes);

        //how we listen to events in socketio
        //when a user connects to server, this will run
        io.on('connection', (socket) => {
            console.log(`A user connected: ${socket.id}`); 

            //handle new messages from clients
            socket.on('send_message', async (data) => {
                //save messages to db
                console.log(data.data); 
                //emit the new message to all clients
                socket.broadcast.emit("receive_message", data);
                //io.emit('message', data); 
            }); 

            //handle disconnection: 
            socket.on('disconnect', () => {
                console.log('A user disconnected'); 
            }); 
        });
 
    });

