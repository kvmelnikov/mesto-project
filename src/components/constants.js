//forms
export const formProfile = document.forms['form-edit'];
export const formCard = document.forms['form-add'];
export const formAvatar = document.forms['form-edit-avatar'];

//popups
export const popupProfileOpenButton = document.querySelector('#profile__edit-button');
export const popupCardOpenButton = document.querySelector('#profile__add-button');
export const popupAvatarOpenButton = document.querySelector('#edit-avatar-profile');

//config
export const config = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_type_no-active',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
}

export const configCard = {
    cardTemplate: '#card-template'
}

//cards 
export const cardTemplate = document.querySelector('#card-template').content;
export const cardList = document.querySelector('.cards');
export const popupLargeImage = document.querySelector('#popup-img');
export const largeImage = popupLargeImage.querySelector('.popup__zoom-image');
export const popupDeleteConfirmation = document.querySelector('#popup-delete-card');
export const trashCardButton = document.querySelector('#delete-card-button');
