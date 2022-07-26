const MAX_ADD_COMMENT = 5;

const bigPictureElement = document.querySelector('.big-picture');
const socialCommentsElement = document.querySelector('.social__comments');
const resetButtonElement = document.querySelector('#picture-cancel');
const loadButtonElement = document.querySelector('.social__comments-loader');
const commentCountElement = document.querySelector('.social__comment-count');

let viewComment;
let commentElements;
const onLoadButtonClick = () => {
  if (viewComment < commentElements.length) {
    let count = commentElements.length - viewComment;
    count = count > MAX_ADD_COMMENT ? MAX_ADD_COMMENT : count;
    while (count--) {
      socialCommentsElement.append(commentElements[viewComment++]);
    }
    commentCountElement.firstChild.remove();
    commentCountElement.prepend(`${viewComment} из `);
  }
};

const onClickReset = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  resetButtonElement.removeEventListener('click', onClickReset);
  window.removeEventListener('keydown', onKeydownEscape);
  loadButtonElement.removeEventListener('click', onLoadButtonClick);
};

function onKeydownEscape(evt) {
  if (evt.key === 'Escape') {
    onClickReset();
  }
}

const showBigPicture = (picture) => {
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  socialCommentsElement.innerHTML = '';
  viewComment = 0;
  commentElements = [];

  picture.comments.forEach((comment) => {
    const element = document.createElement('li');
    element.classList.add('social__comment');
    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;
    const text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = comment.message;
    element.append(img, text);
    commentElements.push(element);
  });

  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
  commentCountElement.querySelector('.comments-count').textContent = picture.comments.length;

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  resetButtonElement.addEventListener('click', onClickReset);
  window.addEventListener('keydown', onKeydownEscape);
  loadButtonElement.addEventListener('click', onLoadButtonClick);
  onLoadButtonClick();
};

export default showBigPicture;
