import './styles/index.css';

import {
    initialCards,
    validationConfig,
    profEditBtn,
    profNameInput,
    profAboutInput,
    profFormElement,
    profAddCardBtn
} from "./utils/constants.js"


import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";


/*********************************** Валидация форм*****************************************/
const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
const validators = {}
formList.forEach((formElement) => {
    const formValidator = new FormValidator(validationConfig, formElement);
    formValidator.enableValidation();
    validators[formElement.getAttribute('name')] = formValidator;
});


/************************************* Попап редактирования профиля***********************************/
const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about'});

const profilePopup = new PopupWithForm('.popup_profile', (inputValues) => {
    userInfo.setUserInfo(inputValues.name, inputValues.about);
    profilePopup.close();
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
    return new Card(
        item.name,
        item.link,
        '#card',
        {
            handleCardClick: (title, image) => {
                popupWithImage.open(title, image);
            }
        }
    );
}

/************************ Генерация начальных карточек при загрузке станицы**************************/
const cardSection = new Section({
        items: initialCards, renderer: (item) => {
            const cardObject = createCard(item);
            cardSection.addItem(cardObject.generateCard());
        }
    }, '.cards'
);

document.addEventListener('DOMContentLoaded', function () {
    cardSection.renderItems();
});

/************************************** Попап добавления карточки ****************************************/
const addCardPopup = new PopupWithForm('.popup_card-add', (inputValues) => {
    const cardObject = createCard({
        name: inputValues['placeName-input'],
        link: inputValues['placeUrl-input']
    });
    cardSection.addItem(cardObject.generateCard());
    addCardPopup.close();
});
addCardPopup.setEventListeners();

profAddCardBtn.addEventListener('click', function () {
    addCardPopup.open();
});
