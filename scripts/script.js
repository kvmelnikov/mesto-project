// first part Popup
//popup
const popup = document.querySelector('#popup');
const closeButton = popup.querySelector('#close_modal');
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


function FormValue(type) {
  if(type === 'edit-form') {
    console.log(type)
    form.name = type
    firstInput.value = profileHeader.textContent.trim();
    secondInput.value = profileDescript.textContent.trim();
    
  }
  else if (type === 'add-form') {
    firstInput.value  = "";
    secondInput.value = "";
    firstInput.attributes.placeholder.value = "Название";
    secondInput.attributes.placeholder.value = "Ссылка на картинку";
    form.name = type
  }
}

function SubmitForm() {
  console.log(' run submit', form)
  if(form.attributes.name.value === 'edit-form') {
    profileHeader.textContent = firstInput.value;
    profileDescript.textContent = secondInput.value;
  }
  else if(form.attributes.name.value === 'add-form')  {
    card = {name: firstInput.value, link: secondInput.value}
    Cards.append(AddOneCard(card));
  }
} 

function Popup(){
  popup.classList.toggle('popup_opened');
}

formButton.addEventListener('click', (event) => {
  event.preventDefault();
  SubmitForm();
  Popup();
});


closeButton.addEventListener('click', Popup);
editButton.addEventListener('click', () => {
  FormValue('edit-form');
  Popup();
});

addButton.addEventListener('click', () => {
  FormValue('add-form');
  Popup();
});


// formButton.addEventListener('click', () => {
//   card = {name: firstInput.value, link: seconInput.value}
//   Cards.append(AddOneCard(card));

// }); 


//two part Cards

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

function createElementCard()  {
  const cardArticle = document.createElement('article');
  const cardImage = document.createElement('img');
  const cardName = document.createElement('div');
  const cardText = document.createElement('h2');
  const cardHeart = document.createElement('button');
  cardArticle.classList.add('card');
  cardImage.classList.add('card__image');
  cardName.classList.add('card__name');
  cardText.classList.add('card__text');
  cardHeart.classList.add('button-default','card__heart');
  return { cardArticle:  cardArticle, cardImage: cardImage, cardName: cardName, cardText: cardText, cardHeart: cardHeart }
}

function AddOneCard(card) {
  element = createElementCard();
  element.cardText.textContent = card.name;
  element.cardName.append(element.cardText);
  element.cardName.append(element.cardHeart);
  element.cardImage.src = card.link;
  element.cardImage.alt = card.name;
  element.cardArticle.append(element.cardImage, element.cardName);
  return element.cardArticle;
}



function AddCards (cards = null) {
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

// three part add Card form










