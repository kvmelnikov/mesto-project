import './styles/pages/index.css';

import { openEditPopup, openAddPopup, closeEditPopup,
     closeAddPopup, openAvatarEdit, closeAvatarEdit, closeDeletePopup } from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import {renderInitialCards} from "./components/card.js";
import {enableUser} from "./components/user.js";
import {initialUser, getCards} from "./components/api.js";

let userId;

// initialization
const queries = [initialUser, getCards];
Promise.all(queries)
    .then(data => {
    data[0]().then(res => {
        userId = enableUser(res)});
    data[1]().then(res => renderInitialCards(res, userId));
    })
    .catch(err => {console.log(err)});


enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_type_no-active',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  }); 


const formEdit = document.querySelector(data.formEdit);
const formAdd = document.querySelector(data.formAdd);
const formEditAvatar = document.querySelector(data.formEditAvatar);
const formAddButton = formAdd.querySelector('.form__button');
const formEditAvatarButton = formEditAvatar.querySelector('.form__button');
const formEditButton = formEdit.querySelector('.form__button');



// modal
const editButton = document.querySelector('#profile__edit-button');
const editCloseButton = document.querySelector('#close-edit-form');
const addCloseButton = document.querySelector('#close-add-form');
const addButton = document.querySelector('#profile__add-button');
const avatarButton = document.querySelector('#edit-avatar-profile');
const avatarCloseButtom = document.querySelector('#close-edit-avatar-form');
const popupDeleteCloseButton = document.querySelector('#close-delete-card');


editButton.addEventListener('click', () => {
    openEditPopup();
  });

editCloseButton.addEventListener('click', () => {
    closeEditPopup();
  });

addButton.addEventListener('click', () => {
    openAddPopup();
});


addCloseButton.addEventListener('click', () => {
    closeAddPopup();
});

avatarButton.addEventListener('click', () => {
    openAvatarEdit();
});

avatarCloseButtom.addEventListener('click', () => {
    closeAvatarEdit();
});

popupDeleteCloseButton.addEventListener('click', () => {
    closeDeletePopup();
});

export {userId};