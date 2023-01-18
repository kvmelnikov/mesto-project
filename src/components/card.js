import { deleteCardApi, addLikeCardApi, deleteLikeCardApi } from "./api.js";
import { openPopup, closePopup } from "./modal.js";

//cards

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.cards');
const popupLargeImage = document.querySelector('#popup-img'); 
const largeImage = popupLargeImage.querySelector('.popup__zoom-image');
const largeImageFigcaption = popupLargeImage.querySelector('.popup__figcaption');
const popupDeleteConfirmation  = document.querySelector('#popup-delete-card');
const trashCardButton = document.querySelector('#delete-card-button')

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
    for(let i = 0; i < cards.length; i++) {
      const card = createCard(cards[i], userId)    
      cardList.append(card);
    }  
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
function openDeletePopup(id, сurrentCard) {
  openPopup(popupDeleteConfirmation)
  trashCardButton.addEventListener('click', ()=>{
      deleteCardApi(id)
      .then( res => {
          сurrentCard.remove();
          const openedPopup = document.querySelector('.popup_opened') 
          closePopup(openedPopup);
      })
      .catch(err => {console.log(err)});
  })
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
