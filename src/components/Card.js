export default class Card {
    constructor(templateSelector, {data, userId, handleCardClick, handleCardRemove, handleClickLike}) {
        this._isLiked = !!(data.likes.find(o => o._id === userId));
        this._cardData = data;
        this._userId = userId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
        this._handleCardLike = handleClickLike;
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
        this._likeCounter = this._element.querySelector('.card__like-count');
        this._likeButton = this._element.querySelector('.card__like');
        this._cardRemoveButton = this._element.querySelector('.card__remove');

        if (this._isLiked) {
            this.addLikeCard();
        }

        this.setLikeCount(this._cardData.likes.length);

        this._setEventListener();

        if (this._cardData.owner._id !== this._userId) {
            this._cardRemoveButton.remove();
        }

        const cardElementTitle = this._element.querySelector('.card__title');
        cardElementTitle.textContent = this._cardData.name;
        this._cardElementImg.src = this._cardData.link;
        this._cardElementImg.alt = this._cardData.name;

        return this._element;
    }

    addLikeCard() {
        this._isLiked = true;
        this._likeButton.classList.add('card__like-active');
    }

    removeLikeCard() {
        this._isLiked = false;
        this._likeButton.classList.remove('card__like-active');
    }

    setLikeCount(count) {
        this._likeCounter.textContent = count;
    }

    isCardLiked() {
        return this._isLiked;
    }

    deleteCard = () => {
        this._element.remove();
    }

    _setEventListener() {
        const cardLikeBtn = this._element.querySelector('.card__like');
        cardLikeBtn.addEventListener('click', () => {
            this._handleCardLike(this._cardData._id)
        });

        const cardRemoveBtn = this._element.querySelector('.card__remove');
        cardRemoveBtn.addEventListener('click', () => {
            this._handleCardRemove(this._cardData._id)
        });


        this._cardElementImg.addEventListener('click', () =>
            this._handleCardClick(this._cardData.name, this._cardData.link)
        );
    }
}
