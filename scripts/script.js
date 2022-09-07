
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close');
let addButton = document.querySelector('.profile__add-button');
let editButton = document.querySelector('.profile__edit-button');

function Popup(){
  
  if(popup.classList.contains('popup_opened')){
    popup.classList.remove('popup_opened');
  } 
  else { 
    popup.classList.add('popup_opened');
  }
}


closePopup.addEventListener('click', Popup);
addButton.addEventListener('click', Popup);
editButton.addEventListener('click', Popup);


