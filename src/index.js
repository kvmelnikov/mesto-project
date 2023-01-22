import './styles/pages/index.css';

import { openPopup, closePopup} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import {renderInitialCards, renderAddCard, createCard} from "./components/card.js";
import {setUserData, fillInNameAndDescript, updateImageAvatar, fillInProfile} from "./components/user.js";
import {initialUser, getCards, sendEditUser, addCardQuery, updateAvatarQuery} from "./components/api.js";
import { formProfile, formCard, formAvatar,
   popups, popupAvatar,  popupCard, popupProfile, popupProfileOpenButton,
  popupCardOpenButton, popupAvatarOpenButton, config} from './components/constants';
let userId;

// initialization
Promise.all([initialUser(), getCards()])
    .then(([userData, cards]) => {
      userId = setUserData(userData);
      renderInitialCards(cards, userId)
    })
    .catch(err => {console.log(err)});

    
// forms
enableValidation(config);

formCard.addEventListener('submit', handleAddCardFormSubmit)
formProfile.addEventListener('submit', handleProfileFormSubmit);
formAvatar.addEventListener('submit', handleAvatarFormSubmit);



function handleSubmit(request, evt, loadingText = "Сохранение...") {
   evt.preventDefault();
 
   const submitButton = evt.submitter;
   const initialText = submitButton.textContent;
   renderLoading(true, submitButton, initialText, loadingText);

   request()
     .then(() => {
       evt.target.reset();

     })
     .catch((err) => {
       console.error(`Ошибка: ${err}`);
     })
     .finally(() => {
       renderLoading(false, submitButton, initialText);
     });
 }
 
 function handleProfileFormSubmit(evt) {
   function makeRequest() {
     const formData = new FormData(evt.target);
     const name = formData.get('name')
     const about = formData.get('description')
    
     return sendEditUser(name, about).then((userData) => {
       fillInNameAndDescript(userData.name, userData.about);
       closePopup(popupProfile);
     });
   }
   handleSubmit(makeRequest, evt);
 }


 function handleAddCardFormSubmit(evt) {

    function makeRequest() {
      const formData = new FormData(evt.target);
      const name = formData.get('placeName');
      const link = formData.get('link');

      return addCardQuery(name, link).then( (data) =>{
        renderAddCard(createCard(data, data.owner._id));
        evt.submitter.classList.add(config.inactiveButtonClass);
        closePopup(popupCard);
    }); 
  }

    handleSubmit(makeRequest, evt)
 }

 function handleAvatarFormSubmit(evt) {

  function makeRequest() {
    const formData = new FormData(evt.target);
    const link = formData.get('link')
    return  updateAvatarQuery(link)
          .then(data => {
               updateImageAvatar(data.avatar, data.name);
               closePopup(popupAvatar)
    });
  }
  handleSubmit(makeRequest, evt)
 }




 function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

//modals
function openEditPopup() {
    fillInProfile();
    openPopup(popupProfile);
}

popupProfileOpenButton.addEventListener('click', openEditPopup);

function openAddPopup() {
    openPopup(popupCard);
}


popupCardOpenButton.addEventListener('click', () => {
  openAddPopup();
});

function openAvatarEdit(){
    openPopup(popupAvatar);
}

popupAvatarOpenButton.addEventListener('click', openAvatarEdit);


popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  })
})
export {userId};