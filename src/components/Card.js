import {openPopup, closePopup} from "./modal.js";
import {
    cardTemplate, cardList, popupLargeImage, largeImage, largeImageFigcaption,
    popupDeleteConfirmation, trashCardButton
} from "./constants.js"


// New Card Class
export default class Card {
    constructor({name, link, owner, likes}, userId, selector, clickHandler) {
        this._name = name;
        this._image = link;
        this._isOwner = owner._id;
        this._userId = userId;
        this._likesCounter = likes.length
        this._selector = selector;
        this._clickHandler = clickHandler; // открывает попап с картинкой
    }

    _getCard() {
        const cardArticle = cardTemplate.querySelector(this._selector).cloneNode(true);
        return cardArticle;
    }

    _setEventListeners() {
        this._card.querySelector('.card__heart').addEventListener('click', () => {
            this._toggleLike()
        });
        this._card.querySelector('.card__trash').addEventListener('click', () => {
            this._openDeletePopup()
        });
        this._card.querySelector('.card__image').addEventListener('click', () => {
            this._clickHandler();
        });
    }

    // TODO Add interaction with API class and it's methods to send likes data to and from server
    _toggleLike() {
        if (this._likeButton.classList.contains('card__heart_active')) {
            this._likeButton.classList.remove('card__heart_active')
        } else {
            this._likeButton.classList.add('card__heart_active')
        }
    }

    _openDeletePopup() {
        console.log('Delete Popup Listener Added OK')
    }

    _openImagePopup() {
        console.log('Open Image Popup Listener Added OK')
    }

    _checkOwner() {
        return this._isOwner === this._userId
    }

    generate() {
        this._card = this._getCard();
        this._card.querySelector('.card__text').textContent = this._name;
        this._card.querySelector('.card__image').src = this._image;
        this._card.querySelector('.card__image').alt = this._name;
        this._card.querySelector('.card__like-number').textContent = this._likesCounter;
        this._likeButton = this._card.querySelector('.card__heart');
        if (this._checkOwner()) {
            const cardTrash = this._card.querySelector('.card__trash');
            cardTrash.classList.add('card__trash_active');
            cardTrash.addEventListener('click', () => {
                const currentCard = cardTrash.closest('.card');
                openDeletePopup(this._card._id, currentCard)
            });
        }
        this._setEventListeners();
        return this._card;
    }


}


// function createCard(card, userId) {
//
//     const cardArticle = cardTemplate.querySelector('.card').cloneNode(true);
//     const cardImage =  cardArticle.querySelector('.card__image');
//     const likeButton = cardArticle.querySelector('.card__heart');
//     const cardTrash = cardArticle.querySelector('.card__trash');
//     const likeNumber = cardArticle.querySelector('.card__like-number');
//     cardImage.src = card.image;
//     cardImage.alt = card.name;
//     cardArticle.querySelector('.card__text').textContent = card.name;
//     likeNumber.textContent = card.likes.length;
//
//     // likes add and del
//     if(card.likes.length > 0 ){
//       if(checkCardLikesOwner(card.likes, userId)) {
//         likeButton.classList.add('card__heart_active');
//       }
//     }
//
//
//     // Надо переписать эту функцию, чтобы условие if было не ивент листенере, а в отдельной функции
//     likeButton.addEventListener('click', (e)=> {
//       if(likeButton.classList.contains('card__heart_active')) {
//         deleteLikeCardApi(card._id).then(data => {
//           renderDeleteLike(likeNumber, likeButton ,data.likes.length)
//         })
//         .catch(err => {console.log(err)});
//       }
//       else{
//         addLikeCardApi(card._id)
//         .then(data =>{
//           renderAddLike(likeNumber, likeButton ,data.likes.length)
//         })
//         .catch(err => {console.log(err)});
//       }
//     });
//
//     // trash
//     if(card.owner._id === userId ){
//       cardTrash.classList.add('card__trash_active');
//       cardTrash.addEventListener('click', () => {
//         const сurrentCard = cardTrash.closest('.card');
//         openDeletePopup(card._id, сurrentCard )
//     });
//   }
//
//     cardImage.addEventListener('click', (event)=> {
//       const src = event.target.src;
//       const alt = event.target.alt
//       openImagePopup(src, alt);
//     })
//
//     return cardArticle;
//   }

function renderInitialCards(cards) {
    cards.forEach((card) => {
        const createdCard = new Card(card, '.card')
        const cardElement = createdCard.generate();
        cardList.prepend(cardElement);
    });
}

function renderAddCard(card) {
    cardList.prepend(card)
}

function renderAddLike(likeNumber, likeButton, likes) {
    likeNumber.textContent = likes;
    likeButton.classList.add('card__heart_active');
}

function renderDeleteLike(likeNumber, likeButton, likes) {
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
        .then(res => {
            const currentCard = document.querySelector(`#${cardId.slice(2)}`);
            currentCard.remove();
            closePopup(popupDeleteConfirmation);
        })
        .catch(err => {
            console.log(err)
        });
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

function fillImageForPopup(src, alt) {
    largeImage.src = src;
    largeImage.alt = alt;
    largeImageFigcaption.textContent = alt;
}


export {renderInitialCards, renderAddCard}
