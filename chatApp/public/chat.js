const socket = io.connect('http://localhost:1000');

const sender = document.getElementById('sender');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');
const feeback = document.getElementById('feeback');

submitBtn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        sender: sender.value,
    });
});

message.addEventListener('keypress', () => {
    socket.emit('typing', sender.value);
});

message.addEventListener('keydown', (event) => {
    
    if (event.key === 'Enter') {
        event.preventDefault();
        submitBtn.click(); 
    }
    
});

socket.on('chat', data => {
    feeback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.sender + ' : </strong>' + data.message + '</p>';
    message.value = '';
});

socket.on('typing', data => {
    feeback.innerHTML = '<p>' + data + ' yazıyor...</p>';
});