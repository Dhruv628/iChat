const socket=io('http://localhost:8000');

//get DOM elements in respective js variables

const form=document.getElementById('send-container');
const messageInput=document.getElementById('inputmsg');
const messageContainer=document.querySelector('.chatbox');

//Audio that will play on recieving messages
var audio = new Audio('notification.mp3');

//Fuction which will append event info in the container
const append=(message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){

        audio.play();
    }

}

//Ask new user their name and let the server know
const name=prompt('Enter your name to join');
socket.emit('new-user-joined', name);

//If the form gets submitted send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You : ${message}`,'right')
    socket.emit('send',message)
    messageInput.value='';
})





//If a new user joins, recieve the event from the server
socket.on('user-joined', name => {
append(`${name} joined the chat`,'right')
})

//If server sends a message,recieve it
socket.on('recieve', data => {
append(` ${data.name} : ${data.message} `,'left')
})

//if a user leaves the chat , append the info to the container
socket.on('left', data => {
append(` ${data.name} left the chat`,'left')
})