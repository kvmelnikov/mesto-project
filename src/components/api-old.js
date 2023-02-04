
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18',
  headers: {
    authorization: '95e1c598-7d7b-4945-aa63-eed177f7d6d7',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if(res.ok) {
    return res.json();
  }
    return Promise.reject(`Ошибка: ${res.status}`);
}


function getCards(){
  return fetch(`${config.baseUrl}/cards`, {
        headers: {
          authorization: config.headers.authorization
        }
      })
      .then(res => {
        return checkResponse(res)});
      }


function initialUser(){
return fetch(`${config.baseUrl}/users/me`,{
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => {
    return checkResponse(res)});
}



function deleteCardApi(id){
 return fetch(`${config.baseUrl}/cards/${id}`,{
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => {
    return checkResponse(res)});
}

// likes
function addLikeCardApi(id){
 return fetch(`${config.baseUrl}/cards/likes/${id}`,{
    method: 'PUT',
    headers: config.headers,  
  })
  .then(res => {
    return checkResponse(res)});
}

function deleteLikeCardApi(id){
 return fetch(`${config.baseUrl}/cards/likes/${id}`,{
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })  
  .then(res => {
    return checkResponse(res)});
}

// forms
function addCardQuery(name, link){
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,  
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => {
    return checkResponse(res)});
}

function updateAvatarQuery(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,  
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(res => {
    return checkResponse(res)});
}


function sendEditUser(name, about){
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,  
  body: JSON.stringify({
    name: name,
    about: about
  })
}).then(res => {
  return checkResponse(res)});
}


export {initialUser, getCards, sendEditUser, addCardQuery, deleteCardApi, addLikeCardApi, deleteLikeCardApi, updateAvatarQuery}
