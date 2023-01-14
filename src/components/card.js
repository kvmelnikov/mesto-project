import { getCards, deleteCardApi, addLikeCardApi, deleteLikeCardApi } from "./api.js";
import { openImagePopup, openDeletePopup } from "./modal.js";

//cards

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.cards');

function checkCardLikesOwner(likes, userId) {
  return likes.some((element) => {
    return element._id === userId;
  })  
}


function createCard(card, userId) {
    
    const cardArticle = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage =  cardArticle.querySelector('.card__image');
    const likeButton = cardArticle.querySelector('.card__heart');
    const cardTrash = cardArticle.querySelector('.card__trash');
    let likeNumber = cardArticle.querySelector('.card__like-number');
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
          likeNumber.textContent = data.likes.length
          likeButton.classList.remove('card__heart_active');
        })
        .catch(err => {console.log(err)});
      }
      else{
        addLikeCardApi(card._id)
        .then(data =>{
          likeNumber.textContent = data.likes.length;
          likeButton.classList.add('card__heart_active');
        })
        .catch(err => {console.log(err)});
      }
    });
    
    // if(card.owner._id === userId ){
    //   console.log('add trash');
    //   cardTrash.classList.add('card__trash_active');
    //   cardTrash.addEventListener('click', () => {
    //     deleteCardApi(card._id).then(res => {
    //       const сurrentCard = cardTrash.closest('.card');
    //       сurrentCard.remove();
    //     })
    //   });
    // }


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

 export {createCard, renderInitialCards, renderAddCard }
