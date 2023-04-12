import { initialCards } from "./card_data.js";
import { selectorObject, toggleButtonState } from "./validate.js";

/*********************************Объявление переменных поп-апа*****************************************/

const popupProf = document.querySelector('.popup_profile');
const profEditBtn = document.querySelector('.profile__editor');
const popupExitBtn = document.querySelector('.popup__exit');
const profName = document.querySelector('.profile__name');
const profAbout = document.querySelector('.profile__about');
const profNameInput = document.querySelector('#name-input');
const profAboutInput = document.querySelector('#about-input');
const formElement = document.querySelector('#profile-editor__form');


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
    console.log("( ╯°□°)╯ ┻━━┻");
}

function updateProf() {
    profNameInput.value = profName.textContent;
    profAboutInput.value = profAbout.textContent;
    openPopup(popupProf);
}


/****************************Закрытие поп-апа с сохранением данных************************************/
function handleProfFormSubmit (evt) {
    evt.preventDefault();
    profName.textContent = profNameInput.value;
    profAbout.textContent = profAboutInput.value;
    closePopup(popupProf);
}


/*********************************Слушатели поп-апа*****************************************/

formElement.addEventListener('submit', handleProfFormSubmit);
profEditBtn.addEventListener('click', updateProf);

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
const exitAddCardBtn = document.querySelector('.popup__exit_card-add');


function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    cardSection.prepend(createCard(cardAddPlaceNameInpt.value, cardAddPlaceUrlInpt.value));
    closePopup(popupCardAdd);
    saveAddCardForm.reset();
}


profAddCardBtn.addEventListener('click', function () {
    saveAddCardForm.reset();
    const inputList = Array.from(saveAddCardForm.querySelectorAll(selectorObject.inputSelector));
    const buttonElement = saveAddCardForm.querySelector(selectorObject.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, selectorObject.inactiveButtonClass);
    openPopup(popupCardAdd);
});

saveAddCardForm.addEventListener('submit', handleAddCardFormSubmit);


/***********************************Карточки*****************************************/

const cardTemplate = document.querySelector('#card').content;
const cardSection = document.querySelector('.cards');


function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardElementImg = cardElement.querySelector('.card__img')
    const cardElementTitle = cardElement.querySelector('.card__title')
    cardElementTitle.textContent = name;
    cardElementImg.src = link;
    cardElementImg.alt = name;

    const cardLikeBtn = cardElement.querySelector('.card__like');
    cardLikeBtn.addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-active');
    });

    const cardRemoveBtn = cardElement.querySelector('.card__remove');
    cardRemoveBtn.addEventListener('click', function (evt) {
        evt.target.parentElement.parentElement.remove();
    });

    cardElementImg.addEventListener('click', function () {
        popupImgImage.src = link;
        popupImgImage.alt = name;
        popupImgTitle.textContent = name;
        openPopup(popupImg);
    });

    return cardElement;
}

document.addEventListener('DOMContentLoaded', function () {
    initialCards.forEach(function(item){
        cardSection.prepend(createCard(item.name, item.link));
    });
});



/**********************************Закрытие поп-ап картинки**************************************/


const popupImg = document.querySelector('.popup_image');
const popupImgExitBtn = document.querySelector('.popup__exit_image');
const popupImgImage = document.querySelector('.popup__image_image');
const popupImgTitle = document.querySelector('.popup__caption_image');


/*********************************Закрытие поп-апов по оверлею и esc****************************************/

const popupSectionList = Array.from(document.querySelectorAll('.popup'));

popupSectionList.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', function (evt) {
        if(evt.target !== evt.currentTarget) return;
        closePopup(evt.target);
    });
});

function closeByEsc(evt) {
    if(evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}






