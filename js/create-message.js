const createMessage = (selector, onSubmit = () => { }, onReject = () => { }) => {
  const messageElement = document.querySelector(selector).content.firstElementChild.cloneNode(true);
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
    if (evt.key === 'Escape') {
      closeMessage();
      onReject();
    }
  };

  if (buttonElement) {
    buttonElement.addEventListener('click', onButtonClick);
    buttonElement.focus();
  }
  window.addEventListener('click', onButtonClick);
  window.addEventListener('keydown', onWindowKeydown);

  function closeMessage() {
    window.removeEventListener('click', onButtonClick);
    window.removeEventListener('keydown', onWindowKeydown);
    if (buttonElement) {
      buttonElement.removeEventListener('click', onButtonClick);
    }
    messageElement.remove();
  }
};

export default createMessage;
