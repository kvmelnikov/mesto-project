import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({selector, image, name}) {
        super(selector);
        this._image = image;
        this._name = name;
        this._bigImage = this._popup.querySelector('.card__image');
        this._caption = this._popup.querySelector('popup__figcaption');
    }

    open() {
        this._bigImage.src = this._image;
        this._caption.textContent = this._name;
        this._popup.classList.add('popup_opened');
    }
}


