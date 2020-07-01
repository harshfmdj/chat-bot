//node server which will handle socket connection
const io = require('socket.io')(8000);
const users = {};
io.on('connection', socket => {
    //if a new user joined,let othe users connected to the server know!
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    //if someone sends a mesage broadcast it to other people
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
    //if someone leaves broadcast to other people disconnect is built in feature as oppose to send and new-user-defined
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id]
    });
});