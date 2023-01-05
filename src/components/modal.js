import {toggleButtonState} from "./validate.js";


function enableModal(data) {   

    const popupAddCard  = document.querySelector(data.popupAddCard);
    const popupEditProfile = document.querySelector(data.popupEditProfile);
    const profileHeader = document.querySelector(data.profileHeader);
    const profileDescript = document.querySelector(data.profileDescript);
    const nameCardInput = document.querySelector(data.nameCardInput);
    const linkInput = document.querySelector(data.linkInput);
    const nameInput = document.querySelector(data.nameInput);
    const descriptInput = document.querySelector(data.descriptInput);
    const formAddCard = document.querySelector(data.formAddCard);
    const formEditCard = document.querySelector(data.formEditCard); 


    function fillInProfile() {
            nameInput.value = profileHeader.textContent.trim();
            descriptInput.value = profileDescript.textContent.trim();
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
        })
    }

    function closePopup(popup) {
            popup.classList.remove('popup_opened')
     }


    return {
        test: function () {
        console.log("test")
    },
        openEditPopup: function() {
            fillInProfile();
            toggleButtonState(formEditCard)
            openPopup(popupEditProfile);
    },
       closeEditPopup: function(){
            fillInProfile();
            closePopup(popupEditProfile);
    },
      openAddPopup: function() {
            nameCardInput.value = '';
            linkInput.value = '';
            toggleButtonState(formAddCard);
            openPopup(popupAddCard);     
    },
      closeAddPopup: function() {
            closePopup(popupAddCard);
    }
          
}
}

export {enableModal};

// (function modal() {
// //popup
// const editCloseButton = document.querySelector('#close-edit-form');
// const addCloseButton = document.querySelector('#close-add-form');
// const imgCloseButton = document.querySelector('#close-img');
// const containerImage = document.querySelector('#container-img');
// const containerAdd = document.querySelector('#container-add');
// const containerEdit = document.querySelector('#container-edit');
// const popupAddCard  = document.querySelector('#popup-add');
// const popupEditProfile = document.querySelector('#popup-edit');
// const popupZoomImage = document.querySelector('#popup-img'); 
// //ZoomImage
// const zoomImage = popupZoomImage.querySelector('.popup__zoom-image');
// const zoomImageFigcaption = popupZoomImage.querySelector('.popup__figcaption');


// //profile
// const editButton = document.querySelector('#profile__edit-button');
// const profileHeader = document.querySelector('#profile__name-header');
// const profileDescript = document.querySelector('#profile__descript');
// const addButton = document.querySelector('#profile__add-button');

// //cards
// const cardTemplate = document.querySelector('#card-template').content;
// const cardList = document.querySelector('.cards');


// //popup methods

// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     popup.addEventListener('mousedown', (e)=> {
//     if(e.target.classList[1] === "popup_opened") {
//       closePopup(popup)
//     }
//     });
    
//     document.addEventListener('keydown', (e) =>{
//       if(e.key === "Escape") {
//         closePopup(popup)
//       }
//     })
//   }
  
//   function closePopup(popup) {
//     popup.classList.remove('popup_opened')
//   }
  
// //   function fillInFormInputs(){
// //     profileHeader.textContent = nameInput.value;
// //     profileDescript.textContent = descriptInput.value;
// //   }
  
// //   function submitFormEdit(){
// //     fillInFormInputs();
// //     closeEditPopup();
// //   }
  
  
// //   function submitFormAdd(){
// //     const card = {name: nameCardInput.value, link: linkInput.value}
// //     cardList.prepend(createCard(card));
// //     closeAddPopup();
// //   }
  
  
//   function openAddPopup() {
//     // nameCardInput.value = '';
//     // linkInput.value = '';
//     openPopup(popupAddCard);
//   }
  
//   function closeAddPopup() {
//     closePopup(popupAddCard);
//   }
  
//   function fillInProfile() {
//     // nameInput.value = profileHeader.textContent.trim();
//     // descriptInput.value = profileDescript.textContent.trim();
//   }
  
//   function openEditPopup() {
//     fillInProfile();
//     openPopup(popupEditProfile);
//   }
  
  
//   function closeEditPopup(){
//     closePopup(popupEditProfile);
//   }
  
//   function createImageForPopup(src, alt){
//     zoomImage.src = src;
//     zoomImage.alt = alt;
//     zoomImageFigcaption.textContent = alt;
//   }
  
//   function openImagePopup(src, alt) {
//     createImageForPopup(src, alt)
//     openPopup(popupZoomImage);
//   }
  
  
//   function closeImagePopup(){
//     closePopup(popupZoomImage);
//   }
  
  
//   editButton.addEventListener('click', () => {
//     openEditPopup();
//   });
  
// //   formEdit.addEventListener('submit', (event) => {
// //     event.preventDefault();
// //     submitFormEdit();
// //   });
  
// //   formAdd.addEventListener('submit', (event)=>{
// //     event.preventDefault();
// //     submitFormAdd();
// //   });
  
//   addButton.addEventListener('click', () => {
//     openAddPopup();
//   });
  
//   editCloseButton.addEventListener('click', () => {
//     closeEditPopup();
//   });
  
//   addCloseButton.addEventListener('click', () => {
//     closeAddPopup();
    
//   });
  
//   imgCloseButton.addEventListener('click',() => {
//     closeImagePopup();
//   });
  
// })();

