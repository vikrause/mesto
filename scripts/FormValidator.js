export class FormValidator {
    constructor(selectorObject, formElement) {
        this._selectorObject = selectorObject;
        this._formElement = formElement;
    }

    enableValidation() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._selectorObject.inputSelector));
        const buttonElement = this._formElement.querySelector(this._selectorObject.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
        this._formElement.addEventListener('reset', () => {
            this._resetValidation()
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._selectorObject.inactiveButtonClass);
            buttonElement.setAttribute('disabled', '');
        } else {
            buttonElement.classList.remove(this._selectorObject.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._selectorObject.inputErrorClass);
        errorElement.classList.add(this._selectorObject.errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._selectorObject.inputErrorClass);
        errorElement.classList.remove(this._selectorObject.errorClass);
        errorElement.textContent = '';
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElements) => {
            return !inputElements.validity.valid;
        })
    }

    _resetValidation() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._selectorObject.inputSelector));
        const buttonElement = this._formElement.querySelector(this._selectorObject.submitButtonSelector);

        inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });

        setTimeout(() => {
            this._toggleButtonState(inputList, buttonElement, this._selectorObject.inactiveButtonClass);
        }, 0);
    }
}
