import { getCards, deleteCardApi, addLikeCardApi, deleteLikeCardApi } from "./api.js";
import { openPopup, closePopup } from "./modal.js";

//cards

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.cards');
const popupZoomImage = document.querySelector('#popup-img'); 
const zoomImage = popupZoomImage.querySelector('.popup__zoom-image');
const zoomImageFigcaption = popupZoomImage.querySelector('.popup__figcaption');
const popupDelete = document.querySelector('#popup-delete-card');
const deleteCardButton = document.querySelector('#delete-card-button')

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
  openPopup(popupDelete)
  deleteCardButton.addEventListener('click', ()=>{
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
  openPopup(popupZoomImage);
}

function fillImageForPopup(src, alt){
  zoomImage.src = src;
  zoomImage.alt = alt;
  zoomImageFigcaption.textContent = alt;
} 


 export {createCard, renderInitialCards, renderAddCard }
