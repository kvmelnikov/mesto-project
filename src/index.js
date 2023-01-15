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


// modal
const editButton = document.querySelector('#profile__edit-button');
const editCloseButton = document.querySelector('#close-edit-form');
const addCloseButton = document.querySelector('#close-add-form');
const addButton = document.querySelector('#profile__add-button');
const avatarButton = document.querySelector('#edit-avatar-profile');
const avatarCloseButtom = document.querySelector('#close-edit-avatar-form');
const popupDeleteCloseButton = document.querySelector('#close-delete-card');
const nameInput = document.querySelector('#name-input');
const descriptInput = document.querySelector('#description-input');
const profileHeader = document.querySelector('#profile__name-header');
const profileDescript = document.querySelector('#profile__descript');


function fillInProfile() {
    nameInput.value = profileHeader.textContent.trim();
    descriptInput.value = profileDescript.textContent.trim();
  }


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


const Form = enableValidation({
    formEdit: '#form-edit',
    formAdd: '#form-add',
    formDelete: 'form-edit-avatar',
    formEditAvatar: '#form-edit-avatar',
    butttonElement: '.form__button',
    inputList: '.form__input',
})

export {userId, fillInProfile};