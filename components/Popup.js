export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _overlayPopupClose = (evt) => {
        if (evt.target !== evt.currentTarget) return;
        this.close();
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._overlayPopupClose);
        this._popup.querySelector('.popup__exit').addEventListener('click', () => this.close());
    }
}
