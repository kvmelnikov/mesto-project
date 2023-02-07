import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({selector, image,}) {
        super(selector);
        this._image = image;

    }

    setEventListeners() {
        super.setEventListeners();
    }

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

}


