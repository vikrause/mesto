
/*********************************Валидация форм**************************************/


/*********************************Функция проверки поля на валидность**************************************/
function isValid(formElement, inputElement, selectorObject) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, selectorObject);
    }else {
        hideInputError(formElement, inputElement, selectorObject);
    }
}

/*********************************Функция показа ошибки поля ввода**************************************/
function showInputError(formElement, inputElement, errorMessage, selectorObject) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectorObject.inputErrorClass);
    errorElement.classList.add(selectorObject.errorClass);
    errorElement.textContent = errorMessage;
}

/*********************************Функция скрытия ошибки поля ввода**************************************/
function hideInputError(formElement, inputElement, selectorObject) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectorObject.inputErrorClass);
    errorElement.classList.remove(selectorObject.errorClass);
    errorElement.textContent = '';
}

/**************************Функция добавления слушателя всем полям формы*********************************/

function setEventListeners(formElement, selectorObject) {
    const inputList = Array.from(formElement.querySelectorAll(selectorObject.inputSelector));
    const buttonElement = formElement.querySelector(selectorObject.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, selectorObject.inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, selectorObject);
            toggleButtonState(inputList, buttonElement, selectorObject.inactiveButtonClass);
        });
    });
}

/**************************Функция добавления слушателя всем формам*********************************/

export function enableValidation(selectorObject) {
    const formList = Array.from(document.querySelectorAll(selectorObject.formSelector))

    formList.forEach((formElement) => {
        setEventListeners(formElement, selectorObject);
    });
}
export const selectorObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

enableValidation(selectorObject);




/*********************************Функция проверки валидности инпутов****************************************/
export function hasInvalidInput(inputList) {
    return inputList.some((inputElements) => {
        return !inputElements.validity.valid;
    })
}

/*********************************Функция изменения статуса активности сабмита****************************************/
export function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}