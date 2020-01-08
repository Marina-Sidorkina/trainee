import {createPhotoTemplate} from '../templates/photo';
import BaseComponent from './base';

export default class CardComponent extends BaseComponent {
  constructor(data) {
    super(data);

    this._onClick = null;
    this._onModalOpen = this._onModalOpen.bind(this);
  }

  get template() {
    return createPhotoTemplate(this._data);
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  _onModalOpen() {
    return typeof this._onClick === `function` && this._onClick();
  }

  createListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`.album__link`)
        .addEventListener(`click`, this._onModalOpen);
    }
  }

  removeListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`.album__link`)
        .removeEventListener(`click`, this._onModalOpen);
    }
  }
}