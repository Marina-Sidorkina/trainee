import {createElement} from '../utils/element';
import cloneDeep from 'lodash.clonedeep';

export default class BaseComponent {
  constructor(data) {
    if (new.target === BaseComponent) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
    this._data = cloneDeep(data);
    this._element = null;
    this._state = {
      isRendered: false
    };
  }

  get element() {
    return this._element;
  }

  get template() {}

  render() {
    if (!this._state.isRendered) {
      this._element = createElement(this.template);
      this.createListeners();
      this._state.isRendered = true;
    }
    return this._element;
  }

  unrender() {
    if (this._state.isRendered) {
      this.removeListeners();
      this._element = null;
      this._state.isRendered = false;
    }
  }

  createListeners() {}
  removeListeners() {}
}