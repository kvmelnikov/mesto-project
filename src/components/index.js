import { enableModal } from "./modal.js";
import { enableValidation } from "./validate.js";
import {enableCreateCards} from "./card.js";
import {initialUser} from "./api.js";
// user

initialUser();



//cards

enableCreateCards({
    cardTemplate: '#card-template',
    cardList: '.cards'
})


// modal
const editButton = document.querySelector('#profile__edit-button');
const editCloseButton = document.querySelector('#close-edit-form');
const addCloseButton = document.querySelector('#close-add-form');
const addButton = document.querySelector('#profile__add-button');

const Modal = enableModal({ 
    popupAddCard: '#popup-add',
    popupEditProfile: '#popup-edit',
    profileHeader: '#profile__name-header',
    profileDescript: '#profile__descript',
    nameCardInput: '#name-card-input',
    linkInput: '#link-input',
    descriptInput: '#description-input',
    nameInput: '#name-input',
    formAddCard: '#form-add',
    formEditCard: '#form-edit'
}) 


editButton.addEventListener('click', () => {
    Modal.openEditPopup();
  });

editCloseButton.addEventListener('click', () => {
    Modal.closeEditPopup();
  });

addButton.addEventListener('click', () => {
    Modal.openAddPopup();
})


addCloseButton.addEventListener('click', () => {
    Modal.closeAddPopup();
})


const Form = enableValidation({
    formEdit: '#form-edit',
    formAdd: '#form-add',
    butttonElement: '.form__button',
    inputList: '.form__input',
})
