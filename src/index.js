import './styles/pages/index.css';

import { openPopup, closePopup} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import {renderInitialCards, renderAddCard, createCard} from "./components/card.js";
import {enableUser, fillInNameAndDescript, updateImageAvatar, fillInProfile} from "./components/user.js";
import {initialUser, getCards, sendEditUser, addCardQuery, updateAvatarQuery} from "./components/api.js";
import { clearInputsInFormAdd } from './components/utils.js';

let userId;

// forms
const formEdit = document.querySelector('#form-edit');
const formEditButton = formEdit.querySelector('.form__button');
const formAdd = document.querySelector('#form-add');
const formAddButton = formAdd.querySelector('.form__button');
const formEditAvatar = document.querySelector('#form-edit-avatar');
const formEditAvatarButton = formEditAvatar.querySelector('.form__button');


// modal
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const popupAvatar = document.querySelector('#popup-edit-avatar');
const currentUrlAvatar = document.querySelector('.profile__image');
const avatarInput = document.querySelector('#edit-avatar-input');
const popupAddCard  = document.querySelector('#popup-add');
const popupEditProfile = document.querySelector('#popup-edit');
const editButton = document.querySelector('#profile__edit-button');
const addButton = document.querySelector('#profile__add-button');
const avatarButton = document.querySelector('#edit-avatar-profile');


// initialization
const queries = [initialUser, getCards];
Promise.all(queries)
    .then(data => {
    data[0]().then(res => {
        userId = enableUser(res)});
    data[1]().then(res => renderInitialCards(res, userId));
    })
    .catch(err => {console.log(err)});


// forms

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
            const popup = formEditAvatar.closest('.popup')
            closePopup(popup)
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
            const popup = formAdd.closest('.popup')
            closePopup(popup)
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
            const popup = formEdit.closest('.popup')
            closePopup(popup)
          })
        .catch(err => {console.log(err)});
});

//modals
function openEditPopup() {
    fillInProfile();
    openPopup(popupEditProfile);
}


editButton.addEventListener('click', openEditPopup);

function openAddPopup() {
    clearInputsInFormAdd();
    openPopup(popupAddCard);
}


addButton.addEventListener('click', openAddPopup);

function openAvatarEdit(){
    avatarInput.value = currentUrlAvatar.src.trim();
    openPopup(popupAvatar);
}

avatarButton.addEventListener('click', openAvatarEdit);


popups.forEach(element => {
    element.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        closePopup(element);
      }
    })
  })


closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {
      closePopup(popup);
    })
  })

export {userId};