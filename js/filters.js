import { debounce } from './debounce.js';

const MAX_AMOUNT_PICTURE = 10;

const filterFormElement = document.querySelector('.img-filters');

const defaultButtonElement = document.querySelector('#filter-default');
const randomButtonElement = document.querySelector('#filter-random');
const sortButtonElement = document.querySelector('#filter-discussed');

// Очистка страницы от прошлого вывода
const removePreviewPicture = () => document.querySelectorAll('.picture').forEach((element) => element.remove());

// Изменение стилей кнопок
let oldActiveElement = defaultButtonElement;
const updateStyleButton = (element) => {
  oldActiveElement.classList.remove('img-filters__button--active');
  element.classList.add('img-filters__button--active');
  oldActiveElement = element;
};

// Фильтрация
const filterRandom = (data) => {
  const lengthData = data.length;
  const amount = lengthData > MAX_AMOUNT_PICTURE ? MAX_AMOUNT_PICTURE : lengthData;
  const pictures = data.slice(0);
  return Array.from({ length: amount }, () => pictures.splice(Math.floor(Math.random() * pictures.length), 1)[0]);
};

const filterDiscussed = (data) => {
  const pictures = data.slice(0);
  pictures.sort((a, b) => b.comments.length - a.comments.length);
  return pictures;
};

// Активировать форму фильтрации и вывод изображений
const activateFilterForm = (onUpdate, data) => {
  filterFormElement.classList.remove('img-filters--inactive');
  onUpdate(data);

  defaultButtonElement.addEventListener('click', debounce(() => {
    updateStyleButton(defaultButtonElement);
    removePreviewPicture();
    onUpdate(data);
  }));
  randomButtonElement.addEventListener('click', debounce(() => {
    updateStyleButton(randomButtonElement);
    removePreviewPicture();
    onUpdate(filterRandom(data));
  }));
  sortButtonElement.addEventListener('click', debounce(() => {
    updateStyleButton(sortButtonElement);
    removePreviewPicture();
    onUpdate(filterDiscussed(data));
  }));
};

export { activateFilterForm };
