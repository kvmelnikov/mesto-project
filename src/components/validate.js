import { sendEditUser, addCardApi, updateAvatar, deleteCardApi } from "./api.js";
import { closeEditPopup, closeAddPopup, closeAvatarEdit } from "./modal.js";
import { updateImageAvatar, updateNameDescript } from "./user.js";
import { createCard, renderAddCard } from "./card.js";

function enableValidation(data) {

    const formEdit = document.querySelector(data.formEdit);
    const formAdd = document.querySelector(data.formAdd);
    const formAddButton = formAdd.querySelector('.form__button');
    const formEditAvatar = document.querySelector(data.formEditAvatar);
    const formEditAvatarButton = formEditAvatar.querySelector('.form__button');
    const formEditButton = formEdit.querySelector('.form__button');
 

    setEventListenerInput(formEdit);
    setEventListenerInput(formAdd);
    setEventListenerInput(formEditAvatar); 

      
    formEditAvatar.addEventListener('submit', (evt) => {
        evt.preventDefault();
        if(!checkInputForm(formEditAvatar)) {
          const formData = new FormData(formEditAvatar);
          const link = formData.get('link')
          const currentTextButton = formEditAvatarButton.textContent;
          formEditAvatarButton.textContent = "Сохранение..." 

          updateAvatar(link, data.formEditAvatar)
          .then(data => {
            updateImageAvatar(data.avatar);
            formEditAvatarButton.textContent = currentTextButton
            closeAvatarEdit()
          })
          .catch(err => {console.log(err)});
        }  
      })

    formEdit.addEventListener('submit', (evt) => {
      evt.preventDefault();
        if(!checkInputForm(formEdit)) {
          const formData = new FormData(formEdit);
          const name = formData.get('name')
          const about = formData.get('description')
          const currentTextButton = formEditAvatarButton.textContent;
          formEditButton.textContent = "Сохранение..." 

          sendEditUser(name, about)
          .then(data => {
            updateNameDescript(data.name, data.about)
            formEditButton.textContent = currentTextButton;
            closeEditPopup()
          } )
          .catch(err => {console.log(err)});
        }  
      });

      formAdd.addEventListener('submit', (evt)=> {
        evt.preventDefault();
        if(!checkInputForm(formAdd)) {
          const formData = new FormData(formAdd);
          const name = formData.get('placeName');
          const link = formData.get('link');
          const currentTextButton = formAddButton.textContent;
          formAddButton.textContent = "Сохранение..." 

          addCardApi(name, link)
          .then(data =>{
            renderAddCard(createCard(data, data.owner._id));
            formAddButton.textContent = currentTextButton;
            closeAddPopup()
          })
          .catch(err => {console.log(err)});
        }
      });
  }


function setEventListenerInput(formElement)  { 
    formElement.addEventListener('input', (e) => {
      const key = e.target.name;
      const value = e.target.value;
      const formData = new FormData(e.currentTarget);
      const error = validate(key, value, e.target)
      toggleButtonState(formElement);
      
      if(!error) {
        hideError(e.target, formElement)
      }
      
      if(error) {
        showError(e.target, error, formElement)
      }
    })
  }

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

function checkInputForm(formElement){
  const inputList =  Array.from(formElement.querySelectorAll('.form__input'));
  return hasInvalidInput(inputList)
}  
  

function toggleButtonState(formElement) {
    const buttonElement = formElement.querySelector('.form__button');

    if(checkInputForm(formElement)) {
      buttonElement.classList.add('form__button_type_no-active');
    }
    else {
      buttonElement.classList.remove('form__button_type_no-active');
    }
  }


function showError(element, errorMessage, formElement) {
  element.classList.add("form__input_type_error");
  const errorSpan =  formElement.querySelector(`#${element.id}-error`);
  errorSpan.textContent = errorMessage
  errorSpan.classList.add('form__input-error_active');
};

function hideError(element, formElement) {
  element.classList.remove("form__input_type_error");
  const errorSpan =  formElement.querySelector(`#${element.id}-error`);
  errorSpan.textContent = ""
  errorSpan.classList.remove('form__input-error_active');
}


function validate(key, value, inputElement) {
  const validator = validators[key]
  return validator(value, inputElement)
}


function nameValidator(value, inputElement) {
  if(inputElement.validity.patternMismatch){
    return inputElement.dataset.errorMessage;
  }
  if(!inputElement.validity.valid) {
    return inputElement.validationMessage;
  }
} 

function descriptionValidator(value, inputElement) {
  if(inputElement.validity.patternMismatch){
    return inputElement.dataset.errorMessage;
  }
  if(!inputElement.validity.valid) {
    return inputElement.validationMessage;
  }
}

function placeNameValidator(value, inputElement) {
  if(inputElement.validity.patternMismatch){
    return inputElement.dataset.errorMessage;
  }
  if(!inputElement.validity.valid) {
    return inputElement.validationMessage;
  }
}

function linkValidator(value, inputElement) {
  if(!inputElement.validity.valid) {
    return inputElement.validationMessage;
  }
}

const validators = {
  name: nameValidator,
  description: descriptionValidator,
  placeName: placeNameValidator,
  link: linkValidator,
}


export {enableValidation, toggleButtonState}