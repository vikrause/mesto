let popup = document.querySelector('.popup');
let profEditBtn = document.querySelector('.profile__editor');
let popupExitBtn = document.querySelector('.popup__exit');
let profName = document.querySelector('.profile__name');
let profAbout = document.querySelector('.profile__about');
let profNameInput = document.querySelector('#name');
let profAboutInput = document.querySelector('#about');
let formElement = document.querySelector('.popup__container');


function openPopup() {
    profNameInput.value = profName.textContent;
    profAboutInput.value = profAbout.textContent;
    popup.classList.add('popup__opened');
}
profEditBtn.addEventListener("click", openPopup);


function closePopup() {
    popup.classList.remove('popup__opened');
}
popupExitBtn.addEventListener("click", closePopup);


function handleFormSubmit (evt) {
    evt.preventDefault();
    profName.textContent = profNameInput.value;
    profAbout.textContent = profAboutInput.value;
    closePopup();
}
formElement.addEventListener('submit', handleFormSubmit);