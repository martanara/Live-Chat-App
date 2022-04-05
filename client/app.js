
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
  } else {
    alert('Please enter username')
  };
}

loginForm.addEventListener('submit', e => {
  login(e);
})

const sendMessage = e => {
  e.preventDefault();
  if(messageContentInput.value){
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  } else {
    alert('Message field can\'t be empty!')
  };
}

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('show', 'message--received');
  if (author === userName) message.classList.add('message--self');
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
