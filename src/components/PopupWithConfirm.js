import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleClickButton) {
        super(popupSelector);
        this._handleClickButton = handleClickButton;

        this._popupSaveButton = this._popup.querySelector('.popup__save');
    }

    open(cardId, card) {
        super.open();
        this._cardId = cardId;
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSaveButton.addEventListener('click', () => {
            this._handleClickButton(this._cardId, this._card);
        });
    }

    setButtonLoading(loading) {
        if (loading) {
            this._popupSaveButton.textContent = 'Я сохраняюсь...';
        } else {
            this._popupSaveButton.textContent = 'Да';
        }
    }
}
