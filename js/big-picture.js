const bigPictureElement = document.querySelector('.big-picture');
const socialCommentsElement = document.querySelector('.social__comments');

const showBigPicture = (picture) => {
  // const pictureElement = evt.target.parentElement;

  bigPictureElement.querySelector('.big-picture__img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  socialCommentsElement.innerHTML = '';
  picture.coments.forEach((coment) => {
    const elrment = document;
  });


  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('.modal-open');
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('.modal-open');
};

export { showBigPicture };
