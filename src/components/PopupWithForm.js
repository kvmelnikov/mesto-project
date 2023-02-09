import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({selector, handleSubmiter}) {
        super(selector)
        this._handleSubmiter = handleSubmiter;
        this._form = this._popup.querySelector('.form');

    }

    _getInputValues() {
        const formData = new FormData(this._form);
        const values = Object.fromEntries(formData);
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmiter(event, this._getInputValues())
        })
    }

    // close() {
    //     super.close();
    // }


}