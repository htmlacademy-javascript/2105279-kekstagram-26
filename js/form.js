const FILE_TYPES = ['bmp', 'gif', 'jpg', 'jpeg', 'png'];

// Получение элементов формы
const formElement = document.querySelector('.img-upload__form');
const imgInputElement = document.querySelector('.img-upload__input');
const editFormElement = document.querySelector('.img-upload__overlay');
const resetButtonElement = document.querySelector('#upload-cancel');
const imgPreviewElement = document.querySelector('.img-upload__preview img');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');

// Инициализация валидации с помощью библиатеки Pristine
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

// Блокировка отправки данных если валидация не пройдена
formElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

// Обработчики событий
const onClickResetButton = () => hideForm();
const onKeydownEscape = (evt) => {
  if (evt.key === 'Escape' && evt.target !== hashtagInputElement && evt.target !== commentInputElement) {
    hideForm();
  }
};

// Показать форму редактирования
const showForm = () => {
  editFormElement.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  resetButtonElement.addEventListener('click', onClickResetButton);
  window.addEventListener('keydown', onKeydownEscape);
};

// Сбросить и скрыть форму
const hideForm = () => {
  editFormElement.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  resetButtonElement.removeEventListener('click', onClickResetButton);
  window.removeEventListener('kеydown', onKeydownEscape);
  formElement.reset();
  pristine.reset();
};

/** Являеться ли файл допустимого типа*/
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


/*
photoChooserElement.addEventListener('change', () => {
  const file = photoChooserElement.files[0];
  if (isImageFile(file)) {
    const newPhoto = document.createElement('img');
    newPhoto.src = URL.createObjectURL(file);
    newPhoto.width = 300;
    photoPreviewElement.innerHTML = '';
    photoPreviewElement.append(newPhoto);
  }
});


// Подключение и привязка слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    '40%': 5000,
    '60%': 10000,
    max: MAX_COST,
  },
  padding: [getMinCost(), 0],
  start: getMinCost(),
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('slide', () => {
  priceHouseElement.value = sliderElement.noUiSlider.get();
  pristine.validate(priceHouseElement);
});

priceHouseElement.addEventListener('input', () => {
  sliderElement.noUiSlider.set(priceHouseElement.value);
});

/** Добавляет действие к событию для случая успешной валидации */
/*
const addEventSubmitToForm = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      onSuccess(evt);
    }
  });
};

// Получение данных формы
const getFormData = () => new FormData(formElement);

// Возрат формы и маркера в исходное состояние
const resetForm = () => {
  formElement.reset();
  onImputTypeHouse();
  onSelectCapacityOption();
  pristine.reset();
  resetNewMarker();
  photoPreviewElement.innerHTML = '';
  avatarPreviewElement.src = DEFAULT_AVATAR;
};
*/

//export { addEventSubmitToForm, getFormData, resetForm };
