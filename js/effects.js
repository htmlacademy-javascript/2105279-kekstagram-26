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

// Эффекты

let currentEffect = EFFECT_DEFAULT;
const applyEffect = (effect) => {
  sliderElement.noUiSlider.updateOptions(effectToConfigSlider[effect]);
  imgPreviewElement.classList.remove(`effects__preview--${currentEffect}`);
  imgPreviewElement.style.filter = '';
  if (effect === EFFECT_DEFAULT) {
    sliderElement.classList.add('visually-hidden');
  } else {
    sliderElement.classList.remove('visually-hidden');
    imgPreviewElement.classList.add(`effects__preview--${effect}`);
  }
  currentEffect = effect;
};
applyEffect(EFFECT_DEFAULT);

const onSlide = () => {
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
sliderElement.noUiSlider.on('slide', onSlide);
effectsRadioElements.forEach((element) =>
  element.addEventListener('change', () => {
    applyEffect(element.value);
    onSlide();
  }));

// Изменение масштаба

let currentScale = SCALE_VALUE_DEFAULT;
const updateScale = (newValue) => {
  if (newValue >= MIN_SCALE_VALUE && newValue <= MAX_SCALE_VALUE) {
    currentScale = newValue;
    scaleInputElement.value = `${newValue}%`;
    imgPreviewElement.style.transform = `scale(${newValue / 100})`;
  }
};
smallerButtonElement.addEventListener('click', () => updateScale(currentScale - SCALE_STEP));
biggerButtonElement.addEventListener('click', () => updateScale(currentScale + SCALE_STEP));

// Сброс эффектов
const resetEffects = () => {
  updateScale(SCALE_VALUE_DEFAULT);
  applyEffect(EFFECT_DEFAULT);
};

export { resetEffects, imgPreviewElement };
