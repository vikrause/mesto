/*********************************Объявление переменных поп-апа*****************************************/

let popup = document.querySelector('.popup');
let profEditBtn = document.querySelector('.profile__editor');
let popupExitBtn = document.querySelector('.popup__exit');
let profName = document.querySelector('.profile__name');
let profAbout = document.querySelector('.profile__about');
let profNameInput = document.querySelector('#name');
let profAboutInput = document.querySelector('#about');
let formElement = document.querySelector('.popup__form');


/*********************************Открытие поп-апа*****************************************/
function openPopup() {
    profNameInput.value = profName.textContent;
    profAboutInput.value = profAbout.textContent;
    popup.classList.add('popup_opened');
    console.log("ฅ•ω•ฅ");
}


/****************************Закрытие поп-апа без сохранения данных***********************************/
function closePopup() {
    popup.classList.remove('popup_opened');
    console.log("( =ノωヽ=)");
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
profEditBtn.addEventListener("click", openPopup);
popupExitBtn.addEventListener("click", closePopup);