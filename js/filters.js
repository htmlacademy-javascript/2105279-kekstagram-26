import { debounce } from './debounce.js';

const MAX_AMOUNT_PICTURE = 10;

const filterFormElement = document.querySelector('.img-filters');

const defaultButtonElement = document.querySelector('#filter-default');
const randomButtonElement = document.querySelector('#filter-random');
const sortButtonElement = document.querySelector('#filter-discussed');

// Очистка страницы от прошлого вывода
const removePreviewPicture = () => document.querySelectorAll('.picture').forEach(element => element.remove());
const updateStyleButton = (element) => {
  defaultButtonElement.classList.remove('img-filters__button--active');
  randomButtonElement.classList.remove('img-filters__button--active');
  sortButtonElement.classList.remove('img-filters__button--active');
  element.classList.add('img-filters__button--active');
};

// Фильтрация
const filteredRandom = (data) => {
  const lengthData = data.length;
  const amount = lengthData > MAX_AMOUNT_PICTURE ? MAX_AMOUNT_PICTURE : lengthData;
  const indexes = Array.from({ length: lengthData }, (_v, index) => index);
  const resultIndexes = Array.from({ length: amount }, () => {
    const index = Math.floor(Math.random() * indexes.length);
    const result = indexes[index];
    indexes.splice(index, 1);
    return result;
  });
  return Array.from(resultIndexes, (value) => data[value]);
};

const filteredDiscussed = (data) => {
  const indexes = Array.from(data, (value, index) => [index, value.comments.length]);
  indexes.sort((a, b) => b[1] - a[1]);
  return Array.from(data, (_v, index) => data[indexes[index][0]]);
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
    onUpdate(filteredRandom(data));
  }));
  sortButtonElement.addEventListener('click', debounce(() => {
    updateStyleButton(sortButtonElement);
    removePreviewPicture();
    onUpdate(filteredDiscussed(data));
  }));
};

export { activateFilterForm };
