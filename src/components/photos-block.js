import BaseComponent from './base';
import ModalComponent from './modal';
import PhotoComponent from './photo';
import {createPhotosBlockTemplate} from '../templates/photos-block';

const modalContainerElement = document.querySelector(`body`);

export default class photosBlockComponent extends BaseComponent {
  constructor(data) {
    super(data);
  }

  get template() {
    return createPhotosBlockTemplate();
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  set onCommentSubmit(fn) {
    this._onCommentSubmit = fn;
  }

  set onModalOpen(fn) {
    this._onModalOpen = fn;
  }


  _renderPhotos(containerElement) {
    const documentFragment = document.createDocumentFragment();
    this.components = this._data.map((photo) => {
      const photoComponent = new PhotoComponent(photo);

      const openModal = (data) => {
        const modalComponent = new ModalComponent(data);
        modalContainerElement.appendChild(modalComponent.render());

        modalComponent.onClose = () => {
          modalContainerElement.removeChild(modalContainerElement.lastChild);
          modalComponent.unrender();
        };

        modalComponent.onCommentSubmit = (comment) => {
          if (typeof this._onCommentSubmit === `function`) {
            this._onCommentSubmit(photo.id, comment);
          };
        }
      }

      photoComponent.onClick = () => {
        if (typeof this._onModalOpen === `function`) {
          this._onModalOpen(photo.id, openModal);
        };
      }

      return photoComponent;
    });

    this.components.forEach((component) => {
      documentFragment.appendChild(component.render());
    });

    containerElement.appendChild(documentFragment);
  }

  render() {
    const element = super.render();
    this._renderPhotos(element);
    return element;
  }
}