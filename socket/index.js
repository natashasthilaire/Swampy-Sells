const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

//since socketid is always checking
let users = []; 

//add users without duplicating information
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({userId, socketId}); 

};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId); 
}; 

const getUser = (userId) => {
    return users.find((user) => user.userId === userId); 
};

io.on("connection", (socket) => {
    //when connecting
    console.log("a user connected"); 

    //take userId and socketId from user
    socket.on("addUser", userId => {
        addUser(userId, socket.id); 
        io.emit("getUsers", users); 
    });

    //send and get messesages: 
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        //find the reciever
        const user = getUser(receiverId); 
        //use the socketid of the reciever to send the message
        io.to(user.socketId).emit("getMessage", {
            senderId, 
            text, 
        }); 
    }); 

    //disconnection function: 
    socket.on("disconnect", () => {
        console.log("a user disconnected"); 
        removeUser(socket.id); 
        io.emit("getUsers", users); 
    })

});