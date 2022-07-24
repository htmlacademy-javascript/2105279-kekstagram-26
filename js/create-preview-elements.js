const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Создание элемента с данными на основе шаблона
const createPrevieElement = (picture, index) => {
  const previewElement = pictureTemplate.cloneNode(true);
  previewElement.querySelector('.picture__img').src = picture.url;
  previewElement.querySelector('.picture__likes').textContent = picture.likes;
  previewElement.querySelector('.picture__comments').textContent = picture.comments.length;
  previewElement.id = index;
  return previewElement;
};

// Создание массива элементов
const createPreviewElements = (data) => data.map(createPrevieElement);

export default createPreviewElements;
