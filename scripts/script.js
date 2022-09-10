// first part Popup

const popup = document.querySelector('#popup');
const closeButton = popup.querySelector('#close_modal');
const editButton = document.querySelector('#profile__edit-button');
const nameInput = document.querySelector('#name__input');
const descriptionInput = document.querySelector('#description__input');
const formButton = document.querySelector('#form__button');
const profileHeader = document.querySelector('#profile__name-header');
const profileDescript = document.querySelector('#profile__descript');



function EditForm() {
  nameInput.value = profileHeader.textContent.trim();
  descriptionInput.value = profileDescript.textContent.trim();
}

function EditProfile() {
  profileHeader.textContent = nameInput.value;
  profileDescript.textContent = descriptionInput.value;
} 

function Popup(){
  EditForm();
  popup.classList.toggle('popup_opened');
}

formButton.addEventListener('click', (event) => {
  event.preventDefault();
  EditProfile();
  Popup();
})

closeButton.addEventListener('click', Popup);
editButton.addEventListener('click', Popup);

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


function AddCard (cards = null) {
  const card_for = [];
  if (cards) {
    for(let i = 0; i < cards.length; i++) {
      element = createElementCard();
      element.cardText.textContent = cards[i].name;
      element.cardName.append(element.cardText);
      element.cardName.append(element.cardHeart);
      element.cardImage.src = cards[i].link;
      element.cardImage.alt = cards[i].name;
      element.cardArticle.append(element.cardImage, element.cardName);
      Cards.append(element.cardArticle);
    }
  }
  else {
      console.log('not cards');
  }
  

}


AddCard(initialCards);






