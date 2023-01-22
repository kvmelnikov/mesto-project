import './styles/pages/index.css';

import { openPopup, closePopup} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import {renderInitialCards, renderAddCard, createCard} from "./components/card.js";
import {enableUser, fillInNameAndDescript, updateImageAvatar, fillInProfile} from "./components/user.js";
import {initialUser, getCards, sendEditUser, addCardQuery, updateAvatarQuery} from "./components/api.js";
import {clearInputsInFormAdd } from './components/utils.js';
import { formProfile, formProfileButton, formCard, formCardButton, formAvatar, formAvatarButton,
  popupsCloseButtons, popups, popupAvatar, currentUrlAvatar, avatarInput, popupCard, popupProfile, popupProfileOpenButton,
  popupCardOpenButton, popupAvatarOpenButton, config} from './components/constants';
let userId;

// initialization
Promise.all([initialUser(), getCards()])
    .then(([userData, cards]) => {
      userId = enableUser(userData);
      renderInitialCards(cards, userId)
    })
    .catch(err => {console.log(err)});

    
// forms
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