//popup
const editCloseButton = document.querySelector('#close-edit-form');
const addCloseButton = document.querySelector('#close-add-form');
const imgCloseButton = document.querySelector('#close-img');
const containerImage = document.querySelector('#container-img');
const containerAdd = document.querySelector('#container-add');
const containerEdit = document.querySelector('#container-edit');
const popupAddCard  = document.querySelector('#popup-add');
const popupEditProfile = document.querySelector('#popup-edit');
const popupZoomImage = document.querySelector('#popup-img'); 

//form
const nameInput = document.querySelector('#name-input');
const descriptInput = document.querySelector('#description-input');
const nameCardInput = document.querySelector('#name-card-input');
const linkInput = document.querySelector('#link-input');
const formEdit = document.querySelector('#form-edit');
const formAdd = document.querySelector('#form-add');


const showError = (element, errorMessage, formElement) => {
  element.classList.add("form__input_type_error");
  const errorSpan =  formElement.querySelector(`#${element.id}-error`);
  errorSpan.textContent = errorMessage
  errorSpan.classList.add('form__input-error_active');
};

const hideError = (element, formElement) => {
  element.classList.remove("form__input_type_error");
  const errorSpan =  formElement.querySelector(`#${element.id}-error`);
  errorSpan.textContent = ""
  errorSpan.classList.remove('form__input-error_active');
}


const validate = (key, value, inputElement) => {
  const validator = validators[key]
  return validator(value, inputElement)
}


const nameValidator = (value, inputElement) => {
  if(!inputElement.validity.valid) {
    return inputElement.validationMessage;
  }
} 

const descriptionValidator = (value, inputElement) => {
  if(!inputElement.validity.valid) {
    return inputElement.validationMessage
  }
}

const placeNameValidator = (value, inputElement) => {
  if(!inputElement.validity.valid) {
    return inputElement.validationMessage
  }
}

const linkValidator = (value, inputElement) => {
  if(!inputElement.validity.valid) {
    return inputElement.validationMessage
  }
}

const validators = {
  name: nameValidator,
  description: descriptionValidator,
  placeName: placeNameValidator,
  link: linkValidator,
}


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState  = (inputList, buttonElement) => {

  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__button_type_no-active');
  }
  else {
    buttonElement.classList.remove('form__button_type_no-active');
  }
}


const setEventListenerInput = (formElement) => {

  const butttonElement = formElement.querySelector('.form__button');
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  toggleButtonState(inputList, butttonElement);

  formElement.addEventListener('input', (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const formData = new FormData(e.currentTarget);
    const error = validate(key, value, e.target)

    toggleButtonState(inputList, butttonElement);

    if(!error) {
      hideError(e.target, formElement)
    }
    
    if(error) {
      showError(e.target, error, formElement)
    }
    
  });

}

const setEventListenerSubmit = (formElement) => {

  formElement.addEventListener('submit', (e) => {
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData);
  });  
}

const enableValidation = () => {
  const listForm = Array.from(document.querySelectorAll('.form'));
  listForm.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListenerInput(formElement);
    setEventListenerSubmit(formElement);
  });
}
enableValidation()

//close 

// popupAddCard.addEventListener('mousedown', (e) => {
//   console.log(e.target.id)
//   if(e.target.id === "popup-add") {
//     closePopup(popupAddCard);
//   }
// });




//ZoomImage
const zoomImage = popupZoomImage.querySelector('.popup__zoom-image');
const zoomImageFigcaption = popupZoomImage.querySelector('.popup__figcaption');


//profile
const editButton = document.querySelector('#profile__edit-button');
const profileHeader = document.querySelector('#profile__name-header');
const profileDescript = document.querySelector('#profile__descript');
const addButton = document.querySelector('#profile__add-button');

//cards
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.cards');


//popup methods

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

function fillInFormInputs(){
  profileHeader.textContent = nameInput.value;
  profileDescript.textContent = descriptInput.value;
}

function submitFormEdit(){
  fillInFormInputs();
  closeEditPopup();
}


function submitFormAdd(){
  const card = {name: nameCardInput.value, link: linkInput.value}
  cardList.prepend(createCard(card));
  closeAddPopup();
}


function openAddPopup() {
  nameCardInput.value = '';
  linkInput.value = '';
  openPopup(popupAddCard);
}

function closeAddPopup() {
  closePopup(popupAddCard);
}

function fillInProfile() {
  nameInput.value = profileHeader.textContent.trim();
  descriptInput.value = profileDescript.textContent.trim();
}

function openEditPopup() {
  fillInProfile();
  openPopup(popupEditProfile);
}


function closeEditPopup(){
  closePopup(popupEditProfile);
}

function createImageForPopup(src, alt){
  zoomImage.src = src;
  zoomImage.alt = alt;
  zoomImageFigcaption.textContent = alt;
}

function openImagePopup(src, alt) {
  createImageForPopup(src, alt)
  openPopup(popupZoomImage);
}


function closeImagePopup(){
  closePopup(popupZoomImage);
}


editButton.addEventListener('click', () => {
  openEditPopup();
});

formEdit.addEventListener('submit', (event) => {
  event.preventDefault();
  submitFormEdit();
});

formAdd.addEventListener('submit', (event)=>{
  event.preventDefault();
  submitFormAdd();
});

addButton.addEventListener('click', () => {
  openAddPopup();
});

editCloseButton.addEventListener('click', () => {
  closeEditPopup();
});

addCloseButton.addEventListener('click', () => {
  closeAddPopup();
  
});

imgCloseButton.addEventListener('click',() => {
  closeImagePopup();
});





// Cards

function createCard(card) {

  const cardArticle = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage =  cardArticle.querySelector('.card__image');
  const cardLike = cardArticle.querySelector('.card__heart');
  const cardTrash = cardArticle.querySelector('.card__trash');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardArticle.querySelector('.card__text').textContent = card.name;
  
  cardLike.addEventListener('click', (event) => {
    event.target.classList.toggle('card__heart_active');
  });

  cardTrash.addEventListener('click', () => {
    const сurrentCard = cardTrash.closest('.card');
    сurrentCard.remove();
  });

  cardImage.addEventListener('click', (event)=> {
    const src = event.target.src;
    const alt = event.target.alt
    openImagePopup(src, alt);
  })

  return cardArticle;
}

function renderInitialCards (cards) {

    for(let i = 0; i < cards.length; i++) {
      const card = createCard(cards[i])
      cardList.append(card);
    }  
  }

renderInitialCards(initialCards);











