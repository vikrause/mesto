
export const initialCards = [
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

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

export const profEditBtn = document.querySelector('.profile__editor');
export const profNameInput = document.querySelector('#name-input');
export const profAboutInput = document.querySelector('#about-input');
export const profFormElement = document.querySelector('#profile-editor__form');
export const profAddCardBtn = document.querySelector('.profile__add-button');