import { enableUser } from './user.js';


const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18',
  headers: {
    authorization: '95e1c598-7d7b-4945-aa63-eed177f7d6d7',
    'Content-Type': 'application/json'
  }
}


function getCards(){
  return fetch(`${config.baseUrl}/cards`, {
        headers: {
          authorization: config.headers.authorization
        }
      })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }


function initialUser(){
return fetch(`${config.baseUrl}/users/me`,{
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}



function deleteCardApi(id){
 return fetch(`${config.baseUrl}/cards/${id}`,{
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// likes
function addLikeCardApi(id){
 return fetch(`${config.baseUrl}/cards/likes/${id}`,{
    method: 'PUT',
    headers: config.headers,  
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

function deleteLikeCardApi(id){
 return fetch(`${config.baseUrl}/cards/likes/${id}`,{
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })  
  .then(res => {
    if(res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

// forms
function addCardApi(name, link){
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,  
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

function updateAvatar(link, button) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,  
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}


function sendEditUser(name, about){
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,  
  body: JSON.stringify({
    name: name,
    about: about
  })
}).then(res =>
   { if(res.ok) {
      return res.json()
   }
   return Promise.reject(`Ошибка: ${res.status}`);
  })
}


export {initialUser, getCards, sendEditUser, addCardApi, deleteCardApi, addLikeCardApi, deleteLikeCardApi, updateAvatar}
