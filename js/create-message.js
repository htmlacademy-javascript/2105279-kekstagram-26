const createMessage = (selector, onSubmit = () => { }, onRreject = () => { }) => {
  const messageElement = document.querySelector(selector).content.firstElementChild.cloneNode(true);
  const buttonElement = messageElement.querySelector('.error__button');
  document.body.prepend(messageElement);

  const onClick = (evt) => {
    closeMessage();
    if (evt.target === buttonElement) {
      onSubmit();
    } else {
      onRreject();
    }
  };

  const onKeydown = (evt) => {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      closeMessage();
      onRreject();
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
