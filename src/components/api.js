import {renderInitialCards, createCard} from './card.js';
import { enableUser } from './user.js';

const token = '95e1c598-7d7b-4945-aa63-eed177f7d6d7';
const url = 'https://nomoreparties.co/v1/plus-cohort-18'

function sendEditUser(name, about){
  fetch(`${url}/users/me`, {
  method: 'PATCH',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name,
    about: about
  })
}).then(res => {
  initialUser()
});
}

function addCardApi(name, link){
  fetch(`${url}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then(res => res.json())
    .then(data => createCard(data))
}


function initialUser(){
  fetch(`${url}/users/me`,{
    headers: {
      authorization: token
    }
  })
  .then(res => res.json())
  .then((data)=> {
    enableUser(data)
  })
}


function initialCards(){
  fetch(`${url}/cards`, {
        headers: {
          authorization: token
        }
      })
      .then(res => res.json())
      .then((data) => {
        renderInitialCards(data)
      });
  }

export {initialUser, initialCards, sendEditUser, addCardApi}
