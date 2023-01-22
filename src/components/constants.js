 //forms
export const formProfile = document.forms['form-edit'];
export const formCard = document.forms['form-add'];
export const formAvatar = document.forms['form-edit-avatar'];

 //popups
export const popups = document.querySelectorAll('.popup');
export const popupAvatar = document.querySelector('#popup-edit-avatar');
export const popupCard  = document.querySelector('#popup-add');
export const popupProfile = document.querySelector('#popup-edit');
export const popupProfileOpenButton = document.querySelector('#profile__edit-button');
export const popupCardOpenButton = document.querySelector('#profile__add-button');
export const popupAvatarOpenButton = document.querySelector('#edit-avatar-profile');

//config
export const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_type_no-active',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

//cards 
export const cardTemplate = document.querySelector('#card-template').content;
export const cardList = document.querySelector('.cards');
export const popupLargeImage = document.querySelector('#popup-img'); 
export const largeImage = popupLargeImage.querySelector('.popup__zoom-image');
export const largeImageFigcaption = popupLargeImage.querySelector('.popup__figcaption');
export const popupDeleteConfirmation  = document.querySelector('#popup-delete-card');
export const trashCardButton = document.querySelector('#delete-card-button')