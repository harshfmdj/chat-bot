const socket = io('http://localhost:8000');
//get Dom elements in respective js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

//Audio that will play 
var audio = new Audio('hollow.mp3')

//function which will append event info to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}
//ask user his/her name and let the server know
const name = prompt("Enter name to join");
socket.emit('new-user-joined', name);

//if a new user joined,receive the event from user
socket.on('user-joined', data => {
    append(`${data} joined the chat`, 'right');

})
//if a user sends the message receive it
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
})
//if a user leave the chat append info to container
socket.on('left', name => {
    append(`${name} left the chat`, 'right');
})
//if the form gets submitted send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})