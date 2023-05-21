import {Card} from "../scripts/Card.js";
import {FormValidator} from "../scripts/FormValidator.js";
import {PopupWithForm} from "../scripts/PopupWithForm.js";
import {UserInfo} from "../scripts/UserInfo.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import {Section} from "../scripts/Section.js";


const initialCards = [
    {
        name: 'Ханой',
        link: 'https://images.unsplash.com/photo-1555921015-5532091f6026?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        name: 'Хошимин',
        link: 'https://images.unsplash.com/photo-1541079033018-63489731598f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        name: 'Нячанг',
        link: 'https://images.unsplash.com/photo-1653611136846-7c67d6746638?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Сеул',
        link: 'https://images.unsplash.com/photo-1586274677440-231405a4c74c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Дубай',
        link: 'https://images.unsplash.com/photo-1546412414-c2658fffe7d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Абу Даби',
        link: 'https://images.unsplash.com/photo-1512971064777-efe44a486ae0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80'
    }
];


/***********************************Валидация форм*****************************************/
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
const validators = {}
formList.forEach((formElement) => {
    const formValidator = new FormValidator(validationConfig, formElement);
    formValidator.enableValidation();
    validators[formElement.getAttribute('name')] = formValidator;
});


/***************************************************Попап редактирования профиля*******************************************************/
const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about'});

const profilePopup = new PopupWithForm('.popup_profile', (inputValues) => {
    userInfo.setUserInfo(inputValues.name, inputValues.about);
    profilePopup.close();
});
profilePopup.setEventListeners();


const profEditBtn = document.querySelector('.profile__editor');// нужно внизу
const profNameInput = document.querySelector('#name-input');// нужно внизу
const profAboutInput = document.querySelector('#about-input');// нужно внизу
const profFormElement = document.querySelector('#profile-editor__form');// нужно внизу

profEditBtn.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    profNameInput.value = userData.name;
    profAboutInput.value = userData.about;

    validators[profFormElement.getAttribute('name')].resetValidation();

    profilePopup.open();
});


/*********************************************Попап картинки************************************************/
const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

/*************************************************Генерация карточек******************************************************/
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


/***********************************Генерация начальных карточек при загрузке станицы*****************************************/
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


/************************************************* Попап добавления карточки ******************************************************/
const addCardPopup = new PopupWithForm('.popup_card-add', (inputValues) => {
    const cardObject = createCard({
        name: inputValues['placeName-input'],
        link: inputValues['placeUrl-input']
    });
    cardSection.addItem(cardObject.generateCard());
    addCardPopup.close();
});
addCardPopup.setEventListeners();

const profAddCardBtn = document.querySelector('.profile__add-button');
profAddCardBtn.addEventListener('click', function () {
    addCardPopup.open();
});
