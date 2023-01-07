import { getCards, userId, deleteCardApi, addLikeCardApi, deleteLikeCardApi } from "./api.js";

//cards

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.cards');
const url = 'https://nomoreparties.co/v1/plus-cohort-18';
const token = '95e1c598-7d7b-4945-aa63-eed177f7d6d7';

function enableCreateCards(data) {
    Promise.resolve(getCards()).then(data => renderInitialCards(data))
}

function incrementlikes(id) {
  return fetch(`${url}/cards/likes/${id}`,{
    method: 'PUT',
    headers: {
      authorization: token,
    }
  }).then(res => res.json())
    .then(data => {
      return data.likes.length
    })
}

function decrementlikes(id){
  let temp;
  deleteLikeCardApi(id).then(data => data.likes.length)
  console.log(temp);
}


function createCard(card) {
    const cardArticle = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage =  cardArticle.querySelector('.card__image');
    const likeButton = cardArticle.querySelector('.card__heart');
    const cardTrash = cardArticle.querySelector('.card__trash');
    let likeNumber = cardArticle.querySelector('.card__like-number');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardArticle.querySelector('.card__text').textContent = card.name;
    likeNumber.textContent = card.likes.length;


    if(card.likes.length > 0 ){
      const currentStateLike = card.likes.some((element) => {
        return element._id === userId;
      })
      if(currentStateLike) {
        likeButton.classList.add('card__heart_active');
      }
    }

    likeButton.addEventListener('click', (e)=> {
      if(likeButton.classList.contains('card__heart_active')) {
        deleteLikeCardApi(card._id).then(likes => likeNumber.textContent = likes)
        likeButton.classList.remove('card__heart_active');
      }
      else{
        addLikeCardApi(card._id).then(likes => likeNumber.textContent = likes);
        likeButton.classList.add('card__heart_active');
      }
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

 export {enableCreateCards, createCard}
