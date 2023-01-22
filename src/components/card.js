import { deleteCardApi, addLikeCardApi, deleteLikeCardApi } from "./api.js";
import { openPopup, closePopup } from "./modal.js";
import { cardTemplate, cardList, popupLargeImage, largeImage, largeImageFigcaption,
  popupDeleteConfirmation, trashCardButton} from "./constants.js"

function createCard(card, userId) {
    
    const cardArticle = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage =  cardArticle.querySelector('.card__image');
    const likeButton = cardArticle.querySelector('.card__heart');
    const cardTrash = cardArticle.querySelector('.card__trash');
    const likeNumber = cardArticle.querySelector('.card__like-number');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardArticle.querySelector('.card__text').textContent = card.name;
    likeNumber.textContent = card.likes.length;

    // likes add and del
    if(card.likes.length > 0 ){
      if(checkCardLikesOwner(card.likes, userId)) {
        likeButton.classList.add('card__heart_active');
      }
    }

    likeButton.addEventListener('click', (e)=> {
      if(likeButton.classList.contains('card__heart_active')) {
        deleteLikeCardApi(card._id).then(data => {
          renderDeleteLike(likeNumber, likeButton ,data.likes.length)
        })
        .catch(err => {console.log(err)});
      }
      else{
        addLikeCardApi(card._id)
        .then(data =>{
          renderAddLike(likeNumber, likeButton ,data.likes.length)
        })
        .catch(err => {console.log(err)});
      }
    });
    
    // trash 
    if(card.owner._id === userId ){
      cardTrash.classList.add('card__trash_active');
      cardTrash.addEventListener('click', () => {
        const сurrentCard = cardTrash.closest('.card');
        openDeletePopup(card._id, сurrentCard )
    });
  }
    
    cardImage.addEventListener('click', (event)=> {
      const src = event.target.src;
      const alt = event.target.alt
      openImagePopup(src, alt);
    })
  
    return cardArticle;
  }
  
function renderInitialCards (cards, userId) {
    cards.forEach((card) => {
      const createdCard = createCard(card, userId)    
      cardList.append(createdCard);
    });
  }

function renderAddCard(card) {
  cardList.prepend(card)
}

function renderAddLike(likeNumber, likeButton, likes){
    likeNumber.textContent = likes;
    likeButton.classList.add('card__heart_active');
}

function renderDeleteLike(likeNumber, likeButton, likes){
    likeNumber.textContent = likes 
    likeButton.classList.remove('card__heart_active');
}

function checkCardLikesOwner(likes, userId) {
  return likes.some((element) => {
    return element._id === userId;
  })  
}

// popups
function deleteCard(e) {
  const cardId = e.target.getAttribute('card_id')
  deleteCardApi(cardId)
      .then( res => {
          const currentCard = document.querySelector(`#${cardId.slice(2)}`);
          currentCard.remove();
          closePopup(popupDeleteConfirmation);
      })
      .catch(err => {console.log(err)});
}


function openDeletePopup(id, сurrentCard) {
  openPopup(popupDeleteConfirmation)
  сurrentCard.id = `${id.slice(2)}`;
  trashCardButton.removeEventListener('click', deleteCard);
  trashCardButton.setAttribute('card_id', id);
  trashCardButton.addEventListener('click', deleteCard)
}   

function openImagePopup(src, alt) {
  fillImageForPopup(src, alt)
  openPopup(popupLargeImage);
}

function fillImageForPopup(src, alt){
  largeImage.src = src;
  largeImage.alt = alt;
  largeImageFigcaption.textContent = alt;
} 


 export {createCard, renderInitialCards, renderAddCard }
