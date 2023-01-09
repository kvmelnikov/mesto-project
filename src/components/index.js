import { openEditPopup, openAddPopup, closeEditPopup,
     closeAddPopup, openAvatarEdit, closeAvatarEdit } from "./modal.js";
import { enableValidation } from "./validate.js";
import {enableCreateCards, renderInitialCards} from "./card.js";
import {enableUser} from "./user.js";
import {initialUser, getCards} from "./api.js";


// initialization
const queries = [initialUser, getCards];
Promise.all(queries).then(data => {
    data[0]().then(res => enableUser(res));
    data[1]().then(res => renderInitialCards(res));
});


// modal
const editButton = document.querySelector('#profile__edit-button');
const editCloseButton = document.querySelector('#close-edit-form');
const addCloseButton = document.querySelector('#close-add-form');
const addButton = document.querySelector('#profile__add-button');
const avatarButton = document.querySelector('#edit-avatar-profile');
const avatarCloseButtom = document.querySelector('#close-edit-avatar-form');


editButton.addEventListener('click', () => {
    openEditPopup();
  });

editCloseButton.addEventListener('click', () => {
    closeEditPopup();
  });

addButton.addEventListener('click', () => {
    openAddPopup();
})


addCloseButton.addEventListener('click', () => {
    closeAddPopup();
})

avatarButton.addEventListener('click', () => {
    openAvatarEdit();
})

avatarCloseButtom.addEventListener('click', () => {
    closeAvatarEdit();
})



const Form = enableValidation({
    formEdit: '#form-edit',
    formAdd: '#form-add',
    formEditAvatar: '#form-edit-avatar',
    butttonElement: '.form__button',
    inputList: '.form__input',
})
