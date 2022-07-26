const createMessage = (selector, onSubmit = () => { }, onReject = () => { }) => {
  const messageElement = document.querySelector(selector).content.firstElementChild.cloneNode(true);
  const buttonElement = messageElement.querySelector('button');
  document.body.append(messageElement);

  const onClick = (evt) => {
    closeMessage();
    if (evt.target === buttonElement) {
      onSubmit();
    } else {
      onReject();
    }
  };

  const onKeydown = (evt) => {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      closeMessage();
      onReject();
    }
  };

  if (buttonElement) {
    buttonElement.addEventListener('click', onClick);
    buttonElement.focus();
  }
  window.addEventListener('click', onClick);
  window.addEventListener('keydown', onKeydown);

  function closeMessage() {
    window.removeEventListener('click', onClick);
    window.removeEventListener('keydown', onKeydown);
    if (buttonElement) {
      buttonElement.removeEventListener('click', onClick);
    }
    messageElement.remove();
  }
};

export default createMessage;
