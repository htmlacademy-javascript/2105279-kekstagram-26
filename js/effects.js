const SCALE_VALUE_DEFAULT = 100;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const SCALE_STEP = 25;

const EFFECT_DEFAULT = 'none';

const effectToConfigSlider = {
  none: {
    range: {
      min: 0,
      max: 0,
    },
    start: 0,
    step: 0
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1
  },
  heat: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1
  }
};

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const effectLevelInputElement = document.querySelector('.effect-level__value');
const effectLevelFieldsetElement = document.querySelector('.img-upload__effect-level');
const imgPreviewElement = document.querySelector('.img-upload__preview img');
const effectsRadioElements = document.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.effect-level__slider');


// Инициализация слайдера
noUiSlider.create(sliderElement, {
  ...effectToConfigSlider[EFFECT_DEFAULT],
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// Изменение масштаба
let currentScale = SCALE_VALUE_DEFAULT;
const updateScale = (newValue) => {
  if (newValue >= MIN_SCALE_VALUE && newValue <= MAX_SCALE_VALUE) {
    currentScale = newValue;
    scaleInputElement.value = `${newValue}%`;
    imgPreviewElement.style.transform = `scale(${newValue / 100})`;
  }
};

// Эффекты
let currentEffect = EFFECT_DEFAULT;
const applyEffect = (effect) => {
  sliderElement.noUiSlider.updateOptions(effectToConfigSlider[effect]);
  imgPreviewElement.classList.remove(`effects__preview--${currentEffect}`);
  imgPreviewElement.style.filter = '';
  if (effect === EFFECT_DEFAULT) {
    effectLevelFieldsetElement.classList.add('hidden');
  } else {
    effectLevelFieldsetElement.classList.remove('hidden');
    imgPreviewElement.classList.add(`effects__preview--${effect}`);
  }
  currentEffect = effect;
};
applyEffect(EFFECT_DEFAULT);

// Обработчики
const onSliderElementSlide = () => {
  const value = sliderElement.noUiSlider.get();
  effectLevelInputElement.value = value;
  switch (currentEffect) {
    case 'chrome': {
      imgPreviewElement.style.filter = `grayscale(${value})`;
      break;
    }
    case 'sepia': {
      imgPreviewElement.style.filter = `sepia(${value})`;
      break;
    }
    case 'marvin': {
      imgPreviewElement.style.filter = `invert(${value}%)`;
      break;
    }
    case 'phobos': {
      imgPreviewElement.style.filter = `blur(${value}px)`;
      break;
    }
    case 'heat': {
      imgPreviewElement.style.filter = `brightness(${value})`;
      break;
    }
  }
};

const onEffectsRadioChange = (evt) => {
  applyEffect(evt.target.value);
  onSliderElementSlide();
};

const onSmallerButtonClick = () => updateScale(currentScale - SCALE_STEP);
const onBiggerButtonClick = () => updateScale(currentScale + SCALE_STEP);


// Добавление и удаление обработчиков
const addEventEffect = () => {
  sliderElement.noUiSlider.on('slide', onSliderElementSlide);
  effectsRadioElements.forEach((element) => element.addEventListener('change', onEffectsRadioChange));
  smallerButtonElement.addEventListener('click', onSmallerButtonClick);
  biggerButtonElement.addEventListener('click', onBiggerButtonClick);
};

const removeEventEffect = () => {
  sliderElement.noUiSlider.off();
  effectsRadioElements.forEach((element) => element.removeEventListener('change', onEffectsRadioChange));
  smallerButtonElement.removeEventListener('click', onSmallerButtonClick);
  biggerButtonElement.removeEventListener('click', onBiggerButtonClick);
};


// Сброс эффектов
const resetEffects = () => {
  updateScale(SCALE_VALUE_DEFAULT);
  applyEffect(EFFECT_DEFAULT);
};

export { addEventEffect, removeEventEffect, resetEffects, imgPreviewElement };
