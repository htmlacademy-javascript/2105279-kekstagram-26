import { resetEffects, imgPreviewElement } from './effects.js';
import { sendData } from "./net-api.js";
import createMessage from './create-message.js';

const FILE_TYPES = ['bmp', 'gif', 'jpg', 'jpeg', 'png'];

// Получение элементов формы
const formElement = document.querySelector('.img-upload__form');
const imgInputElement = document.querySelector('.img-upload__input');
const editFormElement = document.querySelector('.img-upload__overlay');
const resetButtonElement = document.querySelector('#upload-cancel');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');

// Инициализация валидации с помощью библиотеки Pristine
const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'ad-form__error'
});

// Валидация хештегов
const regular = /^#[0-9A-Za-zА-Яа-яЁё]{1,19}$/;
let errorHashtagMessage = '';

const setErrorMessage = (condition, message) => {
  if (condition) {
    errorHashtagMessage = message;
  }
  return !condition;
};

pristine.addValidator(hashtagInputElement, (value) => {
  let result = true;
  if (value.length) {
    const hashtags = value.split(' ').filter(({ length }) => length);
    result &= setErrorMessage(hashtags.length > 5, 'Больше 5-ти хештегов нельзя.');
    result &= setErrorMessage(!hashtags.every((hashtag) => regular.test(hashtag)), 'Хештег должен начинаться с # и состоять только из букв и чисел.');
    result &= setErrorMessage(hashtags.every(({ length }) => length < 2 || length > 20), 'Хештег не должен быть пустым или длиннее 20 символов включая #');
  }
  return result;
}, () => errorHashtagMessage);

// Обработчики событий
const onClickResetButton = () => {
  hideForm();
  resetForm();
};

const onKeydownEscape = (evt) => {
  if (
    evt.key === 'Escape' &&
    evt.target !== hashtagInputElement &&
    evt.target !== commentInputElement &&
    !document.querySelector('.error')
  ) {
    hideForm();
    resetForm();
  }
};

// Показать форму редактирования
const showForm = () => {
  editFormElement.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  resetButtonElement.addEventListener('click', onClickResetButton);
  window.addEventListener('keydown', onKeydownEscape);
};

// Скрыть форму
const hideForm = () => {
  editFormElement.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  resetButtonElement.removeEventListener('click', onClickResetButton);
  window.removeEventListener('keydown', onKeydownEscape);
};

// Сбросить форму
const resetForm = () => {
  formElement.reset();
  pristine.reset();
  resetEffects();
};

/** Является ли файл допустимого типа*/
const isImageFile = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

// Добавление события для отображения формы
imgInputElement.addEventListener('change', () => {
  const file = imgInputElement.files[0];
  if (isImageFile(file)) {
    imgPreviewElement.src = URL.createObjectURL(file);
    showForm();
  }
});


// Добавление события для отправки данных
formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    sendData(
      () => {
        hideForm();
        resetForm();
        createMessage('#success');
      },
      () => {
        hideForm();
        createMessage('#error', showForm, showForm);
      },
      new FormData(formElement)
    );
  }
});
