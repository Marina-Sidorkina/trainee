import PhotosBlockComponent from './components/photos-block';

const mainElement = document.querySelector(".main");
const photosUrl = `https://boiling-refuge-66454.herokuapp.com/images`;
const ResponseStatus = {
  MIN: 200,
  MAX: 300
};
let photosBlockComponent;

const getModalInfoUrl = (id) => `https://boiling-refuge-66454.herokuapp.com/images/${id}`;
const getCommentsUrl = (id) => `https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`;

const checkStatus = (response) => {
  if (response.status >= ResponseStatus.MIN && response.status < ResponseStatus.MAX) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const getAndOpenModal = (id, openModal) => {
  fetch(getModalInfoUrl(id), {method: `GET`})
    .then(response => checkStatus(response))
    .then(response => response.json())
    .then(data => openModal(data))
    .catch((error) => {
      console.log('Error: ' + error.message);
    });
};

const onCommentSubmit = (id, comments) => {
  fetch(getCommentsUrl(id), {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(comments)
  })
    .then(response => checkStatus(response))
    .catch((error) => {
      console.log('Error: ' + error.message);
  });
};

const renderPhotos = (photos) => {
  photosBlockComponent = new PhotosBlockComponent(photos);
  mainElement.appendChild(photosBlockComponent.render());
  photosBlockComponent.onModalOpen = getAndOpenModal;
  photosBlockComponent.onCommentSubmit = onCommentSubmit;
};

const getAndShowPhotos = () => {
  fetch(photosUrl, {method: `GET`})
    .then(response => checkStatus(response))
    .then(response => response.json())
    .then(photos => renderPhotos(photos))
    .catch((error) => {
      console.log('Error: ' + error.message);
    });
};

getAndShowPhotos();