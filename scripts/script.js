// first part Popup
//popup

const popupForm = document.querySelector('#popup');
const popupImg = document.querySelector('#popup-img');
const closeButton = popup.querySelector('#close_modal');
const closeButtonPopupImg = popupImg.querySelector('#close_modal-img');
const editButton = document.querySelector('#profile__edit-button');
const popupConteiner = document.querySelector('.popup__container');

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

//cards

const cardTemplate = document.querySelector('#card-template').content;

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
    const card = {name: firstInput.value, link: secondInput.value}
    Cards.prepend(createCard(card));
  }
} 

// Modal

function addOpened(popup) {
  const addedOpened = popup + '_opened';
  return addedOpened;
}

function openPopup(popup) {
  const addClass = addOpened(popup);
  if(addClass==='popup_opened'){
    popupConteiner.style.display = 'flex';
    popupForm.classList.add(addClass);
  }
  else if(addClass=='popup-image_opened'){
    popupImg.classList.add(addClass);
  }
}

function closePopup(popup) {
  const delClass =addOpened(popup);
  if(delClass==='popup_opened'){
    popupConteiner.style.display = 'none';
    popupForm.classList.remove(delClass);
  }
  else if(delClass==='popup-image_opened'){
    popupImg.classList.remove(delClass);
  }
}


formButton.addEventListener('click', (event) => {
  event.preventDefault();
  SubmitForm();
});


closeButton.addEventListener('click', () => {
  closePopup('popup');
});

closeButtonPopupImg.addEventListener('click', () => {
  closePopup('popup-image');
});


editButton.addEventListener('click', () => {
  FormValue('edit-form');
  openPopup('popup');
});

addButton.addEventListener('click', () => {
  FormValue('add-form');
  openPopup('popup');
});

// Cards

const Cards = document.querySelector('.cards');

function openImagePopup(src, alt) {
  const ImgForPopup = popupImg.querySelector('.popup-image__image')
  ImgForPopup.src = src;
  ImgForPopup.alt = alt;
  popupImg.querySelector('.popup-image__figcaption').textContent = alt;
  openPopup('popup-image');
}


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

    modalImg(event.target.src,event.target.alt);
  })

  return cardArticle;
}


function renderInitialCards (cards) {
  

    for(let i = 0; i < cards.length; i++) {
      article = createCard(cards[i])
      Cards.append(article);
    }  
  }


renderInitialCards(initialCards);











