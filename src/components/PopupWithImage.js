import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImgImage = this._popup.querySelector(".popup__image_image");
        this._popupImgTitle = this._popup.querySelector(".popup__caption_image");
    }

    open(title, image) {
        this._popupImgImage.src = image;
        this._popupImgImage.alt = title;
        this._popupImgTitle.textContent = title;
        super.open();
    }

}
