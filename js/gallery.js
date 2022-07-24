import { getData } from "./net-api.js";
import createPreviewElement from "./create-preview-element.js";
import createMessage from './create-message.js';
import { showBigPicture } from './big-picture.js';

let pictureData;

const onClickPreview = (evt) => {
  const index = evt.target.parentElement.id;
  console.log(evt.target.parentElement);
  console.log(index);
  showBigPicture(pictureData[index]);
};


const showPreviewPicture = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach((picture, index) => {
    const element = createPreviewElement(picture);
    element.id = index;
    element.addEventListener('click', onClickPreview);
    fragment.append(element);
  });
  document.querySelector('.pictures').prepend(fragment);
};

const onGetData = () =>
  getData(
    (data) => {
      pictureData = data;
      showPreviewPicture(data);
    },
    () => createMessage(
      '#error_load',
      onGetData
    ));

onGetData();
