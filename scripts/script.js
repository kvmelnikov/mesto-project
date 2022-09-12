// first part Popup
//popup

const popup = document.querySelector('#popup');
const popupImg = document.querySelector('#popup-img');
const closeButton = popup.querySelector('#close_modal');
const closeButtonPopupImg = popupImg.querySelector('#close_modal-img');
const editButton = document.querySelector('#profile__edit-button');

//form

const firstInput = document.querySelector('#first__input');
const secondInput = document.querySelector('#second__input');
const formTitle = document.querySelector('#form__title');
const formButton = document.querySelector('#form__button');
const form = document.querySelector('#form');

//profile

const profileHeader = document.querySelector('#profile__name-header');
const profileDescript = document.querySelector('#profile__descript');
const addButton = document.querySelector('#profile__add-button');


//form methods

function FormValue(type) {
  if(type === 'edit-form') {
    form.name = type
    formTitle.textContent = "Редактировать профиль";
    formButton.textContent = "Сохранить"
    firstInput.value = profileHeader.textContent.trim();
    secondInput.value = profileDescript.textContent.trim();
   
    
  }
  else if (type === 'add-form') {
    form.name = type
    firstInput.value  = "";
    secondInput.value = "";
    formTitle.textContent = "Новое место"
    formButton.textContent = "Добавить"
    firstInput.attributes.placeholder.value = "Название";
    secondInput.attributes.placeholder.value = "Ссылка на картинку";
    
  }
}

function SubmitForm() {

  if(form.attributes.name.value === 'edit-form') {
    profileHeader.textContent = firstInput.value;
    profileDescript.textContent = secondInput.value;
  }
  else if(form.attributes.name.value === 'add-form')  {
    card = {name: firstInput.value, link: secondInput.value}
    Cards.append(AddOneCard(card));
  }
} 

// Modal

function modalForm(){
  popup.classList.toggle('popup_opened');
}


function modalImg(src, alt) {
  popupImg.querySelector('.popup-image__image').src = src;
  popupImg.querySelector('.popup-image__figcaption').textContent = alt;
  popupImg.classList.add('popup-image_opened')
}


formButton.addEventListener('click', (event) => {
  event.preventDefault();
  SubmitForm();
  modalForm();
});


closeButton.addEventListener('click', modalForm);
closeButtonPopupImg.addEventListener('click', () => {
  popupImg.classList.remove('popup-image_opened');
});


editButton.addEventListener('click', () => {
  FormValue('edit-form');
  modalForm();
});

addButton.addEventListener('click', () => {
  FormValue('add-form');
  modalForm();
});

// Cards

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const Cards = document.querySelector('.cards');

function AddOneCard(card) {

  const cardTemplate = document.querySelector('#card-template').content;
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
    const CurrentCard = cardTrash.closest('.card');
    CurrentCard.remove();
  });

  cardImage.addEventListener('click', (event)=> {
    console.log(event.target.alt);
    
    modalImg(event.target.src,event.target.alt);
  })

  return cardArticle;
}


function AddCards (cards) {
  
  const card_for = [];
  if (cards) {
    for(let i = 0; i < cards.length; i++) {
      article = AddOneCard(cards[i])
      Cards.append(article);
    }
  }
  else {
      console.log('not cards');
  }
}

AddCards(initialCards);











