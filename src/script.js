

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

const toggleButtonState  = (inputList, formElement) => {

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

    // toggleButtonState(inputList, butttonElement);

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











