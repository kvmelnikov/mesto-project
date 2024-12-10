import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({selector, zoomImage, figcaption}) {
        super(selector);
        this._bigImage = this._popup.querySelector(zoomImage);
        this._caption = this._popup.querySelector(figcaption);
    }

    open(link, name) {
        super.open();
        this._bigImage.src = link;
        this._bigImage.alt = name;
        this._caption.textContent = name;
    }

}


