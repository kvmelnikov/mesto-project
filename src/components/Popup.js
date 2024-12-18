export default class Popup {
    constructor(selector) {
        this._selector = selector;
        this._popup = document.querySelector(this._selector);
        this._handleEscClose = this._handleEscClose.bind(this) 
    }

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose)
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {

            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
            if (evt.target.classList.contains('popup__close')) {
                this.close();
            }
        })
    }

}

