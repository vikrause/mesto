import './index.css';

import {
    validationConfig,
    profEditBtn,
    profNameInput,
    profAboutInput,
    profFormElement,
    profAddCardBtn
} from "../src/utils/constants.js"


import Card from "../src/components/Card.js";
import FormValidator from "../src/components/FormValidator.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import UserInfo from "../src/components/UserInfo.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import Section from "../src/components/Section.js";
import Api from "../src/components/Api.js";
import PopupWithConfirm from "../src/components/PopupWithConfirm.js";


/*********************************** Валидация форм*****************************************/
const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
const validators = {}
formList.forEach((formElement) => {
    const formValidator = new FormValidator(validationConfig, formElement);
    formValidator.enableValidation();
    validators[formElement.getAttribute('name')] = formValidator;
});


/************************************* Работа с апи ***********************************/
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: '19829aee-46a8-4b5d-8f84-0b42e3127f3f',
        'Content-Type': 'application/json'
    }
});

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardItems]) => {
        userId = userData._id;
        cardSection.renderItems(cardItems.reverse());
        userInfo.setUserInfo(userData.name, userData.about);
        userInfo.setAvatar(userData.avatar);
    })
    .catch((err) => {
        console.log(err);
    });
/************************************* Попап редактирования профиля***********************************/
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about',
    avatarSelector: '.profile__avatar'
});

const profilePopup = new PopupWithForm('.popup_profile', (inputValues) => {
    profilePopup.setButtonLoading(true)

    api.setUserInfo(inputValues.name, inputValues.about)
        .then((res) => {
            userInfo.setUserInfo(res.name, res.about);
            profilePopup.close();
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            profilePopup.setButtonLoading(false)
        });
});
profilePopup.setEventListeners();

profEditBtn.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    profNameInput.value = userData.name;
    profAboutInput.value = userData.about;

    validators[profFormElement.getAttribute('name')].resetValidation();

    profilePopup.open();
});

/********************************** Попап картинки*************************************/
const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

/******************************** Генерация карточек********************************************/
const createCard = (item) => {
    const card = new Card(
        '#card',
        {
            data: item,
            userId: userId,
            handleCardClick: (title, image) => {
                popupWithImage.open(title, image);
            },
            handleCardRemove: (cardId) => {
                removeCardPopup.open(cardId, card);
            },
            handleClickLike: (cardId) => {
                if (card.isCardLiked()) {
                    api.removeCardLike(cardId)
                        .then((res) => {
                            card.removeLikeCard();
                            card.setLikeCount(res.likes.length);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    api.addCardLike(cardId)
                        .then((res) => {
                            card.addLikeCard();
                            card.setLikeCount(res.likes.length);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        }
    );

    return card.generateCard();
}

/************************ Генерация начальных карточек при загрузке станицы**************************/

const cardSection = new Section({
        renderer: (item) => {
            const cardElement = createCard(item);
            cardSection.addItem(cardElement);
        }
    }, '.cards'
);


/************************************** Попап добавления карточки ****************************************/
const addCardPopup = new PopupWithForm('.popup_card-add', (inputValues) => {
    addCardPopup.setButtonLoading(true);
    api.addNewCard(inputValues['placeName-input'], inputValues['placeUrl-input'])
        .then((res) => {
            const cardElement = createCard(res);
            cardSection.addItem(cardElement);
            addCardPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            addCardPopup.setButtonLoading(false);
        })
});
addCardPopup.setEventListeners();

profAddCardBtn.addEventListener('click', function () {
    addCardPopup.open();
});


/************************************** ВЫ УВЕРЕНЫ???????? ****************************************/
const removeCardPopup = new PopupWithConfirm('.popup_delete-card', (cardId, card) => {
    removeCardPopup.setButtonLoading(true);
    api.removeCard(cardId)
        .then(() => {
            card.deleteCard();
            removeCardPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            removeCardPopup.setButtonLoading(false);
        })
});

removeCardPopup.setEventListeners();


/************************************** Обновление аватарки ****************************************/


const updateAvatar = new PopupWithForm('.popup_avatar', (inputValues) => {
    updateAvatar.setButtonLoading(true);
    api.updateAvatar(inputValues['avatar-input'])
        .then((res) => {
            userInfo.setAvatar(res.avatar);
            updateAvatar.close();
        }).catch((err) => {
        console.log(err);
    }).finally(() => {
        updateAvatar.setButtonLoading(false);
    });
});
updateAvatar.setEventListeners();

document.querySelector('.profile__avatar').addEventListener('click', () => {
    updateAvatar.open();
});
