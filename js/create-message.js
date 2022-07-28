import isEscapeKey from './is-escape-key.js';

const Message = {
  ERROR_UPLOAD: '#error',
  ERROR_LOAD: '#error_load',
  SUCCESS: '#success'
};

const messageElements = [];
for (const key in Message) {
  messageElements[Message[key]] = document.querySelector(Message[key]).content.firstElementChild;
}

let closeMessage = null;
const createMessage = (selector, onSubmit = () => { }, onReject = () => { }) => {
  const messageElement = messageElements[selector].cloneNode(true);
  const buttonElement = messageElement.querySelector('button');
  document.body.append(messageElement);

  const onButtonClick = (evt) => {
    closeMessage();
    if (evt.target === buttonElement) {
      onSubmit();
    } else {
      onReject();
    }
  };

  const onWindowKeydown = (evt) => {
    evt.preventDefault();
    if (isEscapeKey(evt)) {
      closeMessage();
      onReject();
    }
  };

  closeMessage = () => {
    window.removeEventListener('click', onButtonClick);
    window.removeEventListener('keydown', onWindowKeydown);
    if (buttonElement) {
      buttonElement.removeEventListener('click', onButtonClick);
    }
    messageElement.remove();
  };

  if (buttonElement) {
    buttonElement.addEventListener('click', onButtonClick);
    buttonElement.focus();
  }
  window.addEventListener('click', onButtonClick);
  window.addEventListener('keydown', onWindowKeydown);

};

export { createMessage, Message };
