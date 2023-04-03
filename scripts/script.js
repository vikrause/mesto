/*********************************Объявление переменных поп-апа*****************************************/

let popup = document.querySelector('.popup');
let profEditBtn = document.querySelector('.profile__editor');
let popupExitBtn = document.querySelector('.popup__exit');
let profName = document.querySelector('.profile__name');
let profAbout = document.querySelector('.profile__about');
let profNameInput = document.querySelector('#name');
let profAboutInput = document.querySelector('#about');
let formElement = document.querySelector('#profile-editor__form');


/*********************************Открытие поп-апа*****************************************/
function openPopup() {
    profNameInput.value = profName.textContent;
    profAboutInput.value = profAbout.textContent;
    popup.classList.add('popup_opened');
    console.log("(╮°-°)╮┳━━┳");
}


/****************************Закрытие поп-апа без сохранения данных***********************************/
function closePopup() {
    popup.classList.remove('popup_opened');
    console.log("( ╯°□°)╯ ┻━━┻");
}


/****************************Закрытие поп-апа с сохранением данных************************************/
function handleFormSubmit (evt) {
    evt.preventDefault();
    profName.textContent = profNameInput.value;
    profAbout.textContent = profAboutInput.value;
    closePopup();
}


/*********************************Слушатели поп-апа*****************************************/

formElement.addEventListener('submit', handleFormSubmit);
profEditBtn.addEventListener('click', openPopup);
popupExitBtn.addEventListener('click', closePopup);



/**************************Объявление переменных поп-апа карточек****************************/

let popupCardAdd = document.querySelector('.popup_card-add');
let cardAddPlaceNameInpt = document.querySelector('#placeName');
let cardAddPlaceUrlInpt = document.querySelector('#placeUrl');
let saveAddCardForm = document.querySelector('#add-card__form');
let profAddCardBtn = document.querySelector('.profile__add-button');
let exitAddCardBtn = document.querySelector('.popup__exit_card-add');

function openPopupAddCard() {
    popupCardAdd.classList.add('popup_opened');
}

function exitPopupAddCard() {
    popupCardAdd.classList.remove('popup_opened');
}


function savePopupAddCard(evt) {
    evt.preventDefault();
    addCard(cardAddPlaceNameInpt.value, cardAddPlaceUrlInpt.value);
    exitPopupAddCard();
}


profAddCardBtn.addEventListener('click',openPopupAddCard);
exitAddCardBtn.addEventListener('click', exitPopupAddCard);
saveAddCardForm.addEventListener('submit', savePopupAddCard);


/***********************************Карточки*****************************************/

const cardTemplate = document.querySelector('#card').content;
const cardSection = document.querySelector('.cards');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function addCard(name, link) {
    let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__img').src = link;
    cardElement.querySelector('.card__img').alt = name;

    let cardLikeBtn = cardElement.querySelector('.card__like');
    cardLikeBtn.addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-active');
    });

    let cardRemoveBtn = cardElement.querySelector('.card__remove');
    cardRemoveBtn.addEventListener('click', function (evt) {
        evt.target.parentElement.parentElement.remove();
    });

    let cardImg = cardElement.querySelector('.card__img');
    cardImg.addEventListener('click', function (evt) {
        popupImgImage.src = evt.target.src;
        popupImgTitle.textContent = evt.target.nextElementSibling.querySelector('.card__title').textContent;
        popupImg.classList.add('popup_opened');
    });

    cardSection.prepend(cardElement);
}

document.addEventListener('DOMContentLoaded', function () {
    initialCards.forEach(function(item){
        return addCard(item.name, item.link);
    });
});



/**********************************Закрытие поп-ап картинки**************************************/


let popupImg = document.querySelector('.popup-img');
let popupImgExitBtn = document.querySelector('.popup-img__exit');
let popupImgImage = document.querySelector('.popup-img__image');
let popupImgTitle = document.querySelector('.popup-img__title');


function closePopupCardImg() {
    popupImg.classList.remove('popup_opened');
}


popupImgExitBtn.addEventListener('click', closePopupCardImg);



