import { initialCards, userId, deleteCardApi } from "./api.js";

//cards

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.cards');


function enableCreateCards(data) {
    const cardTemplate = document.querySelector(data.cardTemplate).content;
    const cardList = document.querySelector(data.cardList);
    initialCards()
} 

function createCard(card) {
    const cardArticle = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage =  cardArticle.querySelector('.card__image');
    const cardLike = cardArticle.querySelector('.card__heart');
    const cardTrash = cardArticle.querySelector('.card__trash');
    const cardNumberLike = cardArticle.querySelector('.card__like-number');


    cardNumberLike.textContent = card.likes.length; 
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardArticle.querySelector('.card__text').textContent = card.name;

    cardLike.addEventListener('click', (event) => {
      event.target.classList.toggle('card__heart_active');
    });

    if(userId === card.owner._id){
      
      cardTrash.classList.add('card__trash_active');
      cardTrash.addEventListener('click', () => {
        deleteCardApi(card._id);
        const сurrentCard = cardTrash.closest('.card');
        сurrentCard.remove();
      });
    }

  
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

function renderAddCard(card) {
  cardList.prepend(card)
}  

 export {enableCreateCards, createCard, renderInitialCards}

  