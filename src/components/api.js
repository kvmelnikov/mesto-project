import { enableUser } from './user.js';

const token = '95e1c598-7d7b-4945-aa63-eed177f7d6d7';
const url = 'https://nomoreparties.co/v1/plus-cohort-18'
let userId;

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
  console.log(res);
  initialUser()
});
}

function initialUser(){
  fetch(`${url}/users/me`,{
    headers: {
      authorization: token
    }
  })
  .then(res => res.json())
  .then((data)=> {
    userId = data._id
    enableUser(data)
  })
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

function deleteCardApi(id){
 fetch(`${url}/cards/${id}`,{
    method: 'DELETE',
    headers: {
      authorization: token,
    }
  }).then(res => res.json())
    .then(data => data);
}

function addLikeCardApi(id){
 return fetch(`${url}/cards/likes/${id}`,{
    method: 'PUT',
    headers: {
      authorization: token,
    }
  }).then(res => res.json())
    .then(data => data.likes.length)
}

function deleteLikeCardApi(id){
 return fetch(`${url}/cards/likes/${id}`,{
    method: 'DELETE',
    headers: {
      authorization: token,
    }
  }).then(res => res.json())
    .then(data => data.likes.length)
}




function getCards(){
  return fetch(`${url}/cards`, {
        headers: {
          authorization: token
        }
      })
      .then(res => res.json())
      .then((data) => data);
  }

export {initialUser, getCards, sendEditUser, addCardApi,
   userId, deleteCardApi, addLikeCardApi, deleteLikeCardApi}
