
export const forms = {
    formProfile: document.forms['form-edit'],
    formCard: document.forms['form-add'],
    formAvatar: document.forms['form-edit-avatar']
}


export const popups  = {
    popupProfileOpenButton: document.querySelector('#profile__edit-button'),
    popupCardOpenButton: document.querySelector('#profile__add-button'),
    popupAvatarOpenButton: document.querySelector('#edit-avatar-profile')
}

export const configValidate = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_type_no-active',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}

export const configForPopupImage = {
    selector: '.popup_type_image',
    zoomImage: '.popup__zoom-image',
    figcaption: '.popup__figcaption'
}


export const configProfile = {
    name: '.profile__name-header',
    about: '.profile__descript',
    avatar: '.profile__image',
    nameInput: '#name-input',
    aboutInput: '#description-input'
}


export const configCard = {
    cardTemplate: '#card-template',
    selector: '.card'
}
