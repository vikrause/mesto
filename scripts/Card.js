import {openPopup} from './index.js';

export class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
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
        this._setEventListener();

        const cardElementImg = this._element.querySelector('.card__img');
        const cardElementTitle = this._element.querySelector('.card__title');
        cardElementTitle.textContent = this._name;
        cardElementImg.src = this._link;
        cardElementImg.alt = this._name;

        return this._element;

    }

    _setEventListener() {
        const cardLikeBtn = this._element.querySelector('.card__like');
        cardLikeBtn.addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__like-active');
        });

        const cardRemoveBtn = this._element.querySelector('.card__remove');
        cardRemoveBtn.addEventListener('click', function (evt) {
            evt.target.parentElement.parentElement.remove();
        });

        const cardElementImg = this._element.querySelector('.card__img');
        const popupImgImage = document.querySelector('.popup__image_image');
        const popupImgTitle = document.querySelector('.popup__caption_image');
        const popupImg = document.querySelector('.popup_image');
        cardElementImg.addEventListener('click', () => {
            popupImgImage.src = this._link;
            popupImgImage.alt = this._name;
            popupImgTitle.textContent = this._name;
            openPopup(popupImg);
        });
    }
}
