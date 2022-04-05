
const socket = io();

// listener
socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('join', (name) => addMessage('ChatBot', `${name} has joined the conversation!`));
socket.on('removeUser', (name) => addMessage('ChatBot', `${name} has left the conversation...`));

let userName = ""

const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

const login = e => {
  e.preventDefault();

  if(userNameInput.value){
    userName = userNameInput.value;
    messagesSection.classList.add('show');
    loginForm.classList.remove('show');
    socket.emit('join', { name: userName })
  } else {
    alert('Please enter username')
  };
}

loginForm.addEventListener('submit', e => {
  login(e);
})

const sendMessage = e => {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if(messageContent){
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  } else {
    alert('Message field can\'t be empty!')
  };
}

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('show', 'message--received');
  if (author === userName) message.classList.add('message--self');
  if (author === 'ChatBot') message.classList.add('message--chatbot');
  message.innerHTML = `
    <h3 class="message__author">${author === userName ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}

addMessageForm.addEventListener('submit', e => {
  sendMessage(e);
})

