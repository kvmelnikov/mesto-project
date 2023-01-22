 //forms
export const formProfile = document.forms['form-edit'];
export const formProfileButton = formProfile.querySelector('.form__button');
export const formCard = document.forms['form-add'];
export const formCardButton = formCard.querySelector('.form__button');
export const formAvatar = document.forms['form-edit-avatar'];
export const formAvatarButton = formAvatar.querySelector('.form__button');

 //popups
export const popupsCloseButtons = document.querySelectorAll('.popup__close');
export const popups = document.querySelectorAll('.popup');
export const popupAvatar = document.querySelector('#popup-edit-avatar');
export const currentUrlAvatar = document.querySelector('.profile__image');
export const avatarInput = document.querySelector('#edit-avatar-input');
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