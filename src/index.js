import './styles/pages/index.css';

import { openPopup, closePopup} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import {renderInitialCards, renderAddCard, createCard} from "./components/card.js";
import {enableUser, fillInNameAndDescript, updateImageAvatar, fillInProfile} from "./components/user.js";
import {initialUser, getCards, sendEditUser, addCardQuery, updateAvatarQuery} from "./components/api.js";
import {clearInputsInFormAdd } from './components/utils.js';

let userId;

// forms
const formProfile = document.querySelector('#form-edit');
const formProfileButton = formProfile.querySelector('.form__button');
const formCard = document.querySelector('#form-add');
const formCardButton = formCard.querySelector('.form__button');
const formAvatar = document.querySelector('#form-edit-avatar');
const formAvatarButton = formAvatar.querySelector('.form__button');


// modal
const popupsCloseButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const popupAvatar = document.querySelector('#popup-edit-avatar');
const currentUrlAvatar = document.querySelector('.profile__image');
const avatarInput = document.querySelector('#edit-avatar-input');
const popupCard  = document.querySelector('#popup-add');
const popupProfile = document.querySelector('#popup-edit');
const popupProfileOpenButton = document.querySelector('#profile__edit-button');
const popupCardOpenButton = document.querySelector('#profile__add-button');
const popupAvatarOpenButton = document.querySelector('#edit-avatar-profile');


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

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_type_no-active',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

enableValidation(config);

  
formAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(formAvatar);
    const link = formData.get('link')
    const currentTextButton = formAvatarButton.textContent;
    formAvatarButton.textContent = "Сохранение..." 

    updateAvatarQuery(link)
        .then(data => {
            updateImageAvatar(data.avatar);
            formAvatarButton.textContent = currentTextButton
            const popup = formAvatar.closest('.popup')
            closePopup(popup)
            })
        .catch(err => {console.log(err)});
});  


formCard.addEventListener('submit', (evt)=> {
    evt.preventDefault();
    const formData = new FormData(formCard);
    const name = formData.get('placeName');
    const link = formData.get('link');
    const currentTextButton = formCardButton.textContent;
    formCardButton.textContent = "Сохранение..." 

    addCardQuery(name, link)
        .then(data =>{
            renderAddCard(createCard(data, data.owner._id));
            formCardButton.textContent = currentTextButton;
            formCardButton.disabled = true;
            formCardButton.classList.add(config.inactiveButtonClass);
            const popup = formCard.closest('.popup')
            closePopup(popup)
            
           })
        .catch(err => {console.log(err)}); 
});

formProfile.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const formData = new FormData(formProfile);
      const name = formData.get('name')
      const about = formData.get('description')
      const currentTextButton = formProfileButton.textContent;
      formProfileButton.textContent = "Сохранение..." 

      sendEditUser(name, about)
        .then(data => {
            fillInNameAndDescript(data.name, data.about)
            formProfileButton.textContent = currentTextButton;
            const popup = formProfile.closest('.popup')
            
            closePopup(popup)

          })
        .catch(err => {console.log(err)});
});

//modals
function openEditPopup() {
    fillInProfile();
    openPopup(popupProfile);
}

popupProfileOpenButton.addEventListener('click', openEditPopup);

function openAddPopup() {
    clearInputsInFormAdd();
    openPopup(popupCard);
}


popupCardOpenButton.addEventListener('click', () => {
  // console.log('poup card open')
  // enableValidation(config);
  openAddPopup();
});

function openAvatarEdit(){
    avatarInput.value = currentUrlAvatar.src.trim();
    openPopup(popupAvatar);
}

popupAvatarOpenButton.addEventListener('click', openAvatarEdit);


popups.forEach(element => {
    element.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        closePopup(element);
      }
    })
  })


popupsCloseButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {
      closePopup(popup);
    })
  })

export {userId};