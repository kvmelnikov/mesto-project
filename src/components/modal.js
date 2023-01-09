import {toggleButtonState} from "./validate.js";

// form modal
const popupAvatar = document.querySelector('#popup-edit-avatar');
const currentUrlAvatar = document.querySelector('.profile__image');
const avatarInput = document.querySelector('#edit-avatar-input');

const popupAddCard  = document.querySelector('#popup-add');
const popupEditProfile = document.querySelector('#popup-edit');
const profileHeader = document.querySelector('#profile__name-header');
const profileDescript = document.querySelector('#profile__descript');
const nameCardInput = document.querySelector('#name-card-input');
const linkInput = document.querySelector('#link-input');
const nameInput = document.querySelector('#name-input');
const descriptInput = document.querySelector('#description-input');
const formAddCard = document.querySelector('#form-add');
const formEditCard = document.querySelector('#form-edit');

// image
const popupZoomImage = document.querySelector('#popup-img'); 
const zoomImage = popupZoomImage.querySelector('.popup__zoom-image');
const zoomImageFigcaption = popupZoomImage.querySelector('.popup__figcaption');
const imgCloseButton = document.querySelector('#close-img');


function fillInProfile() {
    nameInput.value = profileHeader.textContent.trim();
    descriptInput.value = profileDescript.textContent.trim();
  }

function closePopup(popup) {
    popup.classList.remove('popup_opened')
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    
    popup.addEventListener('mousedown', (e)=> {
    if(e.target.classList[1] === "popup_opened") {
    closePopup(popup)
    }
    });
    
    document.addEventListener('keydown', (e) =>{
    if(e.key === "Escape") {
        closePopup(popup)
    }
    });
}

function openAvatarEdit(){
    avatarInput.value = currentUrlAvatar.src.trim();
    openPopup(popupAvatar);
}

function closeAvatarEdit(){
    closePopup(popupAvatar)
}

function openEditPopup() {
    fillInProfile();
    toggleButtonState(formEditCard)
    openPopup(popupEditProfile);
}

function closeEditPopup(){
    fillInProfile();
    closePopup(popupEditProfile);
}

function openAddPopup() {
    nameCardInput.value = '';
    linkInput.value = '';
    toggleButtonState(formAddCard);
    openPopup(popupAddCard);
}
    
function closeAddPopup() {
    closePopup(popupAddCard);
}    

function openImagePopup(src, alt) {
    createImageForPopup(src, alt)
    openPopup(popupZoomImage);
  }

function closeImagePopup(){
    closePopup(popupZoomImage);
  }

function createImageForPopup(src, alt){
    zoomImage.src = src;
    zoomImage.alt = alt;
    zoomImageFigcaption.textContent = alt;
} 

imgCloseButton.addEventListener('click',() => {
    closeImagePopup();
  });



export {openEditPopup, openAddPopup, closeEditPopup, closeAddPopup,
     openImagePopup, closeImagePopup, closeAvatarEdit, openAvatarEdit};