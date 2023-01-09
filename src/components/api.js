import { enableUser } from './user.js';
import { savedEnd, savedStart } from './utils.js';



const token = '95e1c598-7d7b-4945-aa63-eed177f7d6d7';
const url = 'https://nomoreparties.co/v1/plus-cohort-18'
let userId;




function getCards(){
  return fetch(`${url}/cards`, {
        headers: {
          authorization: token
        }
      })
      .then(res => res.json())
      .then((data) => data);
  }

function initialUser(){
return fetch(`${url}/users/me`,{
    headers: {
      authorization: token
    }
  })
  .then(res => res.json())
  .then((data)=> {
    userId = data._id
    return Promise.resolve(data)
  })
}


function deleteCardApi(id){
 return fetch(`${url}/cards/${id}`,{
    method: 'DELETE',
    headers: {
      authorization: token,
    }
  }).then(res => res.json())
    .then(data => data);
}

// likes
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

// forms
function addCardApi(name, link){
  return fetch(`${url}/cards`, {
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
    .then(data => data)
}

function updateAvatar(link, button) {
  return fetch(`${url}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}


function sendEditUser(name, about){
  return fetch(`${url}/users/me`, {
  method: 'PATCH',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name,
    about: about
  })
}).then(res => res.json())
  .then(data => console.log(data))
}


export {initialUser, getCards, sendEditUser, addCardApi,
   userId, deleteCardApi, addLikeCardApi, deleteLikeCardApi, updateAvatar}
