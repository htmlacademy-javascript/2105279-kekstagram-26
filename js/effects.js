const SCALE_VALUE_DEFAULT = 100;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const SCALE_STEP = 25;

const EFFECT_DEFAULT = 'none';

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview img');// !!!
const effectsRadioElements = document.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.effect-level__slider');


// Подключение слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
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
// Сброс слайдера
const resetSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    start: 1,
  });

};

sliderElement.noUiSlider.on('slide', () => {
  imgPreviewElement.style.filter = 'grayscale(' + sliderElement.noUiSlider.get(); +')';
});

// Эффекты

let currentEffect = EFFECT_DEFAULT;
const applyEffect = (effect) => {
  if (currentEffect === effect) {
    return;
  }
  imgPreviewElement.style.filter = '';
  imgPreviewElement.classList.remove('effects__preview--' + currentEffect);
  if (effect === EFFECT_DEFAULT) {
    sliderElement.classList.add('visually-hidden');
  } else {
    sliderElement.classList.remove('visually-hidden');
    imgPreviewElement.classList.add('effects__preview--' + effect);
  }
  currentEffect = effect;
};
effectsRadioElements.forEach((element) =>
  element.addEventListener('change', () => {
    applyEffect(element.value);
  }));

// Изменение масштаба

let currentScale = SCALE_VALUE_DEFAULT;
const updateScale = (newValue) => {
  if (newValue >= MIN_SCALE_VALUE && newValue <= MAX_SCALE_VALUE) {
    currentScale = newValue;
    scaleInputElement.value = newValue + '%';
    imgPreviewElement.style.transform = 'scale(' + newValue / 100 + ')';
  }
};
smallerButtonElement.addEventListener('click', () => updateScale(currentScale - SCALE_STEP));
biggerButtonElement.addEventListener('click', () => updateScale(currentScale + SCALE_STEP));


