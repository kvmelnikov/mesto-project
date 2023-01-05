import { sendEditUser, addCardApi } from "./api.js";


function enableValidation(data) {

    const listForm = Array.from(document.querySelectorAll(data.form));
    const formEdit = document.querySelector(data.formEdit);
    const formAdd = document.querySelector(data.formAdd);
    const formEditButton = formEdit.querySelector('.form__button');
    setEventListenerInput(formEdit);
    setEventListenerInput(formAdd);

      formEdit.addEventListener('submit', (evt) => {
        evt.preventDefault();
        
        if(!checkInputForm(formEdit)) {
          const formData = new FormData(formEdit);
          sendEditUser(formData.get('name'), formData.get('description'));
        }  
      });

      formAdd.addEventListener('submit', (evt)=> {
        evt.preventDefault();
        if(!checkInputForm(formAdd)) {
          const formData = new FormData(formAdd);
          addCardApi(formData.get('placeName'), formData.get('link'))
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
  if(!inputElement.validity.valid) {
    return inputElement.validationMessage;
  }
} 

function descriptionValidator(value, inputElement) {
  if(!inputElement.validity.valid) {
    return inputElement.validationMessage;
  }
}

function placeNameValidator(value, inputElement) {
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