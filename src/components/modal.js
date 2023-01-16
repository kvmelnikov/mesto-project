// import {toggleButtonState} from "./validate.js";
import {deleteCardApi} from "./api.js";

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
const popupDelete = document.querySelector('#popup-delete-card');
const deleteCardButton = document.querySelector('#delete-card-button')

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


function closePopupEscape(event) {
    if(event.key === "Escape") {
        closePopup(event.currentTarget.popup)
        event.target.removeEventListener('keydown', closePopupEscape);
    }
}


function openPopup(popup) {
    popup.classList.add('popup_opened');
    
    popup.addEventListener('mousedown', (e)=> {
    if(e.target.classList[1] === "popup_opened") {
    closePopup(popup)
    }
    });

    document.popup = popup
    document.addEventListener('keydown', closePopupEscape);
   
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
    // toggleButtonState(formEditCard)
    openPopup(popupEditProfile);
}

function closeEditPopup(){
    fillInProfile();
    closePopup(popupEditProfile);
}

function openDeletePopup(id, сurrentCard) {
    openPopup(popupDelete)
    deleteCardButton.addEventListener('click', ()=>{
        deleteCardApi(id)
        .then( res => {
            сurrentCard.remove();   
            closeDeletePopup();
        })
        .catch(err => {console.log(err)});
    })
}   

function closeDeletePopup() {
    closePopup(popupDelete)
}

function openAddPopup() {
    nameCardInput.value = '';
    linkInput.value = '';
    // toggleButtonState(formAddCard);
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
     openImagePopup, closeImagePopup, closeAvatarEdit, openAvatarEdit, closeDeletePopup, openDeletePopup};