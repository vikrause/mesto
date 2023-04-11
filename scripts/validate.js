
/*********************************Валидация форм**************************************/


/*********************************Функция проверки поля на валидность**************************************/
function isValid(formElement, inputElement, SelectorObject) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, SelectorObject);
    }else {
        hideInputError(formElement, inputElement, SelectorObject);
    }
}

/*********************************Функция показа ошибки поля ввода**************************************/
function showInputError(formElement, inputElement, errorMessage, SelectorObject) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(SelectorObject.inputErrorClass);
    errorElement.classList.add(SelectorObject.errorClass);
    errorElement.textContent = errorMessage;
}

/*********************************Функция скрытия ошибки поля ввода**************************************/
function hideInputError(formElement, inputElement, SelectorObject) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(SelectorObject.inputErrorClass);
    errorElement.classList.remove(SelectorObject.errorClass);
    errorElement.textContent = '';
}

/**************************Функция добавления слушателя всем полям формы*********************************/

function setEventListeners(formElement, SelectorObject) {
    const inputList = Array.from(formElement.querySelectorAll(SelectorObject.inputSelector));
    const buttonElement = formElement.querySelector(SelectorObject.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, SelectorObject.inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, SelectorObject);
            toggleButtonState(inputList, buttonElement, SelectorObject.inactiveButtonClass);
        });
    });
}

/**************************Функция добавления слушателя всем формам*********************************/

export function enableValidation(SelectorObject) {
    const formList = Array.from(document.querySelectorAll(SelectorObject.formSelector))

    formList.forEach((formElement) => {
        setEventListeners(formElement, SelectorObject);
    });
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});


/*********************************Функция проверки валидности инпутов****************************************/
export function hasInvalidInput(inputList) {
    return inputList.some((inputElements) => {
        return !inputElements.validity.valid;
    })
}

/*********************************Функция изменения статуса активности сабмита****************************************/
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}