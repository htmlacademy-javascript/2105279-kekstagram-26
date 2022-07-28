
import { getData } from './net-api.js';
import createPreviewElement from './create-preview-element.js';
import createMessage from './create-message.js';
import showBigPicture from './big-picture.js';
import { activateFilterForm } from './filters.js';
import './form.js';

let pictureData;

const onPictureClick = (evt) => {
  if (evt.target.tagName === 'IMG') {
    showBigPicture(pictureData[evt.target.parentElement.id]);
  }
};

const showPreviewPicture = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach((picture) => {
    const element = createPreviewElement(picture);
    element.addEventListener('click', onPictureClick);
    fragment.append(element);
  });
  document.querySelector('.pictures').prepend(fragment);
};

const loadData = () =>
  getData(
    (data) => {
      pictureData = data;
      activateFilterForm(showPreviewPicture, data);
    },
    () => createMessage(
      '#error_load',
      loadData
    ));

loadData();
