const bigPictureElement = document.querySelector('.big-picture');
const socialCommentsElement = document.querySelector('.social__comments');

const showBigPicture = (picture) => {
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  console.log(picture.url);
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  socialCommentsElement.innerHTML = '';

  picture.comments.forEach((coment) => {
    const element = document.createElement('li');
    element.classList.add('social__comment');
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = coment.avatar;
    img.alt = coment.name;
    img.width = 35;
    img.height = 35;
    const text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = coment.message;
    element.append(img, text);
    socialCommentsElement.append(element);
  });

  bigPictureElement.querySelector('.social__caption').textContent = picture.description;



  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('.modal-open');
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('.modal-open');
};

export { showBigPicture };
