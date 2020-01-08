import {createModalTemplate, createNewCommentTemplate} from '../templates/modal';
import BaseComponent from './base';
import {createElement} from '../utils/element';

export default class ModalComponent extends BaseComponent {
  constructor(data) {
    super(data);

    this._onClose = null;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscapeButtonClick = this._onEscapeButtonClick.bind(this);
    this._onCommentAdd = this._onCommentAdd.bind(this);
  }

  get template() {
    return createModalTemplate(this._data);
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  set onCommentSubmit(fn) {
    this._onCommentSubmit = fn;
  }

  _onCloseButtonClick() {
    return typeof this._onClose === `function` && this._onClose();
  }

  _onEscapeButtonClick(evt) {
    if (evt.keyCode === 27) {
      return typeof this._onClose === `function` && this._onClose();
    }
  }

  _createComment(comment) {
    return createElement(
        createNewCommentTemplate(comment)
    );
  }

  _onCommentAdd(evt) {
    evt.preventDefault();
    const nameInputElement = this._element.querySelector(`.modal__add-name`);
    const commentInputElement = this._element.querySelector(`.modal__add-comment`);

    const newComment = {
      comment: commentInputElement.value,
      name: nameInputElement.value,
      date: Date.parse(new Date())
    }

    if (nameInputElement.value && commentInputElement.value) {
      this._element.querySelector(`.modal__comments`)
        .appendChild(this._createComment(newComment));
        nameInputElement.value = ``;
        commentInputElement.value = ``;

      if (typeof this._onCommentSubmit === `function`) {
        this._onCommentSubmit(newComment);
      }
    }
  }

  createListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`.modal__button`)
        .addEventListener(`click`, this._onCloseButtonClick);

      window.addEventListener(`keydown`, this._onEscapeButtonClick);

      this
        ._element
        .querySelector(`.modal__submit`)
        .addEventListener(`click`, this._onCommentAdd);
      }
  }

  removeListeners() {
    this
      ._element
      .querySelector(`.modal__button`)
      .removeEventListener(`click`, this._onCloseButtonClick);

    window.removeEventListener(`keydown`, this._onEscapeButtonClick);

    this
      ._element
      .querySelector(`.modal__submit`)
      .removeEventListener(`click`, this._onCommentAdd);
  }
}