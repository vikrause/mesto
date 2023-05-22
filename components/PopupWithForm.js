import Popup from "./Popup.js";


export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;

        this._popupForm = this._popup.querySelector('.popup__form');
        this._popupFormInputList = this._popupForm.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._inputValueList = {};
        this._popupFormInputList.forEach((inputElement) => {
            this._inputValueList[inputElement.name] = inputElement.value;
        });

        return this._inputValueList;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}
