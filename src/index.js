import {Card} from "../scripts/Card.js";
import {FormValidator} from "../scripts/FormValidator.js";
import {PopupWithForm} from "../scripts/PopupWithForm.js";
import {UserInfo} from "../scripts/UserInfo.js";


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


/*********************************Объявление переменных поп-апа*****************************************/

// const popupProf = document.querySelector('.popup_profile');



/***********************************Валидация форм*****************************************/
/***********************************НЕ УДАЛЯТЬ*****************************************/

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

/*********************************Открытие поп-апа*****************************************/
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
    console.log("(╮°-°)╮┳━━┳");
}

/****************************Закрытие поп-апа без сохранения данных***********************************/
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
    const popupForm = popup.querySelector(validationConfig.formSelector);
    if (popupForm) {
        popupForm.reset();
    }
    console.log("( ╯°□°)╯ ┻━━┻");
}

/*function updateProf() {
    profNameInput.value = profName.textContent;
    profAboutInput.value = profAbout.textContent;

    validators[profFormElement.getAttribute('name')].resetValidation();

    openPopup(popupProf);
}*/


/****************************Закрытие поп-апа с сохранением данных************************************//*
function handleProfFormSubmit(evt) {
    evt.preventDefault();
    profName.textContent = profNameInput.value;
    profAbout.textContent = profAboutInput.value;
    closePopup(popupProf);
}*/


/*********************************Слушатели поп-апа*****************************************/

// profFormElement.addEventListener('submit', handleProfFormSubmit);


/************************** Слушатели крестика попапа ****************************/
const closeButtonList = Array.from(document.querySelectorAll('.popup__exit'));
closeButtonList.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

/**************************Объявление переменных поп-апа карточек****************************/

const popupCardAdd = document.querySelector('.popup_card-add');
const cardAddPlaceNameInpt = document.querySelector('#placeName-input');
const cardAddPlaceUrlInpt = document.querySelector('#placeUrl-input');
const saveAddCardForm = document.querySelector('#add-card__form');
const profAddCardBtn = document.querySelector('.profile__add-button');



function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const card = new Card(cardAddPlaceNameInpt.value, cardAddPlaceUrlInpt.value, '#card', handleOpenPopup);
    cardSection.prepend(card.generateCard());
    closePopup(popupCardAdd);
}


profAddCardBtn.addEventListener('click', function () {
    openPopup(popupCardAdd);
});

saveAddCardForm.addEventListener('submit', handleAddCardFormSubmit);


/***********************************Генерация начальных карточек при загрузке станицы*****************************************/

const cardSection = document.querySelector('.cards');
document.addEventListener('DOMContentLoaded', function () {
    initialCards.forEach(function (item) {
        const card = new Card(item.name, item.link, '#card', handleOpenPopup);
        cardSection.prepend(card.generateCard());
    });
});


/*********************************Закрытие поп-апов по оверлею и esc****************************************/

const popupSectionList = Array.from(document.querySelectorAll('.popup'));

popupSectionList.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', function (evt) {
        if (evt.target !== evt.currentTarget) return;
        closePopup(evt.target);
    });
});

function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function handleOpenPopup(name, link) {
    const popupImgImage = document.querySelector('.popup__image_image');
    const popupImgTitle = document.querySelector('.popup__caption_image');
    const popupImg = document.querySelector('.popup_image');

    popupImgImage.src = link;
    popupImgImage.alt = name;
    popupImgTitle.textContent = name;

    openPopup(popupImg);
}


/**********************************************************************************************************/
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
