const SCALE_VALUE_DEFAULT = 100;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const SCALE_STEP = 25;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview img');// !!!


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


