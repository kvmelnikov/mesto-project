import './styles/pages/index.css';

import { openEditPopup, openAddPopup, closeEditPopup,
     closeAddPopup, openAvatarEdit, closeAvatarEdit, closeDeletePopup } from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import {renderInitialCards, renderAddCard, createCard} from "./components/card.js";
import {enableUser, fillInNameAndDescript, updateImageAvatar} from "./components/user.js";
import {initialUser, getCards, sendEditUser, addCardQuery, updateAvatarQuery} from "./components/api.js";

let userId;
// forms
const formEdit = document.querySelector('#form-edit');
const formEditButton = formEdit.querySelector('.form__button');
const formAdd = document.querySelector('#form-add');
const formAddButton = formAdd.querySelector('.form__button');
const formEditAvatar = document.querySelector('#form-edit-avatar');
const formEditAvatarButton = formEditAvatar.querySelector('.form__button');


// modal
const editButton = document.querySelector('#profile__edit-button');
const editCloseButton = document.querySelector('#close-edit-form');
const addCloseButton = document.querySelector('#close-add-form');
const addButton = document.querySelector('#profile__add-button');
const avatarButton = document.querySelector('#edit-avatar-profile');
const avatarCloseButtom = document.querySelector('#close-edit-avatar-form');
const popupDeleteCloseButton = document.querySelector('#close-delete-card');


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
  
formEditAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(formEditAvatar);
    const link = formData.get('link')
    const currentTextButton = formEditAvatarButton.textContent;
    formEditAvatarButton.textContent = "Сохранение..." 

    updateAvatarQuery(link)
        .then(data => {
            updateImageAvatar(data.avatar);
            formEditAvatarButton.textContent = currentTextButton
            closeAvatarEdit()
            })
        .catch(err => {console.log(err)});
});  



formAdd.addEventListener('submit', (evt)=> {
    evt.preventDefault();
    const formData = new FormData(formAdd);
    const name = formData.get('placeName');
    const link = formData.get('link');
    const currentTextButton = formAddButton.textContent;
    formAddButton.textContent = "Сохранение..." 

    addCardQuery(name, link)
        .then(data =>{
            renderAddCard(createCard(data, data.owner._id));
            formAddButton.textContent = currentTextButton;
            closeAddPopup()
           })
        .catch(err => {console.log(err)}); 
});



formEdit.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const formData = new FormData(formEdit);
      const name = formData.get('name')
      const about = formData.get('description')
      const currentTextButton = formEditButton.textContent;
      formEditButton.textContent = "Сохранение..." 

      sendEditUser(name, about)
        .then(data => {
            fillInNameAndDescript(data.name, data.about)
            formEditButton.textContent = currentTextButton;
            closeEditPopup()
          })
        .catch(err => {console.log(err)});
});



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