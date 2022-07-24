import { getData } from "./net-api.js";
import createPreviewElements from "./create-preview-elements.js";
import createMessage from './create-message.js';

let previewElements;
let pictureData;

const showPreviewPicture = () => {
  const fragment = document.createDocumentFragment();
  fragment.append(...previewElements);
  document.querySelector('.pictures').prepend(fragment);
};

const onGetData = () =>
  getData(
    (data) => {
      pictureData = data;
      previewElements = createPreviewElements(data);
      showPreviewPicture();
    },
    () => createMessage(
      '#error_load',
      onGetData
    ));

onGetData();
