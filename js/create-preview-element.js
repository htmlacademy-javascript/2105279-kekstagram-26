const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Создание элемента с данными на основе шаблона
const createPreviewElement = (picture) => {
  const previewElement = pictureTemplate.cloneNode(true);
  previewElement.querySelector('.picture__img').src = picture.url;
  previewElement.querySelector('.picture__likes').textContent = picture.likes;
  previewElement.querySelector('.picture__comments').textContent = picture.comments.length;
  previewElement.id = picture.id;
  return previewElement;
};


export default createPreviewElement;
