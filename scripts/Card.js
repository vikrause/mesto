export class Card {
    constructor(name, link, templateSelector, handleOpenPopup) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleOpenPopup = handleOpenPopup;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardElementImg = this._element.querySelector('.card__img');
        this._addLikeEventListener();
        this._removeLikeEventListener();
        this._setImgPopupEventListener();

        const cardElementTitle = this._element.querySelector('.card__title');
        cardElementTitle.textContent = this._name;
        this._cardElementImg.src = this._link;
        this._cardElementImg.alt = this._name;

        return this._element;

    }

    _addLikeEventListener() {
        const cardLikeBtn = this._element.querySelector('.card__like');
        cardLikeBtn.addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__like-active');
        });
    }

    _removeLikeEventListener() {
        const cardRemoveBtn = this._element.querySelector('.card__remove');
        cardRemoveBtn.addEventListener('click', function (evt) {
            evt.target.parentElement.parentElement.remove();
        });
    }

    _setImgPopupEventListener() {
        this._cardElementImg.addEventListener('click', () => {
            this._handleOpenPopup(this._name, this._link)
        });
    }
}
