import {
    cardTemplate, cardList, popupLargeImage, largeImage, largeImageFigcaption,
    popupDeleteConfirmation, trashCardButton
} from "./constants.js"


// New Card Class
export default class Card {
    constructor({name, _id, link, owner, likes}, 
                {handleClick, handleDelete, handleLike, handleDeleteLike},
                 userId, selector) {
        this._name = name;
        this._cardId = _id;
        this._image = link;
        this._isOwner = owner._id;
        this._userId = userId;
        this._likes = likes;
        this._selector = selector;
        this._handleClick = handleClick;
        this._handleDelete = handleDelete;
        this._handleLike = handleLike; 
        this._handleDeleteLike = handleDeleteLike;
    }

    _getCard() {
        const cardArticle = cardTemplate.querySelector(this._selector).cloneNode(true);
        return cardArticle;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {

            if(this._likeButton.classList.contains('card__heart_active')) {
                this._handleDeleteLike(this._cardId)
                .then(res => {
                    this._toggleLike(); 
                    this._likeNumber.textContent = res.likes.length
                })
                .catch(err=> {console.log(err)});
            } else {
                this._handleLike(this._cardId)
                .then(res => {
                    this._toggleLike(); 
                    this._likeNumber.textContent = res.likes.length
                 })
                 .catch(err => {console.log(err)});
            }              
        });
        if(this._cardTrash){
            this._cardTrash.addEventListener('click', () => {
                this._handleDelete(this._cardId)
                .then(res=> {
                    this._card.remove();
                })
                .catch(err => {console.log(err)});
             });
        }
   
        this._card.querySelector('.card__image').addEventListener('click', () => {
            this._handleClick(this._image, this._name);
        });
    }

    _toggleLike() {

        if (this._likeButton.classList.contains('card__heart_active')) {
            this._likeButton.classList.remove('card__heart_active')
        } else {
            this._likeButton.classList.add('card__heart_active')
        }
    }

    _checkOwnerCard() {
        return this._isOwner === this._userId
    }

    _checkCardLikesOwner(){
        return this._likes.some((element) => {
            return element._id === this._userId;
        })
    }


    generate() {
        this._card = this._getCard();
        this._card.querySelector('.card__text').textContent = this._name;
        this._cardImage = this._card.querySelector('.card__image');
        this._cardImage.src = this._image;
        this._cardImage.alt = this._name;

        this._likeNumber = this._card.querySelector('.card__like-number')
        this._likeNumber.textContent = this._likes.length;

        this._likeButton = this._card.querySelector('.card__heart');

        if(this._likes.length > 0 ){
                  if(this._checkCardLikesOwner()) {
                    this._likeButton.classList.add('card__heart_active');
                  }
                }

        if (this._checkOwnerCard()) {
            this._cardTrash = this._card.querySelector('.card__trash');
            this._cardTrash.classList.add('card__trash_active');
        }

        this._setEventListeners();

        return this._card;
    }


}
