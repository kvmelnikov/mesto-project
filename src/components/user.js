
const nameUser = document.querySelector('.profile__name-header');
const aboutUser = document.querySelector('.profile__descript');
const avatarUser = document.querySelector('.profile__image');
const buttonAvatar = document.querySelector('#edit-image-profile'); 

function enableUser(data){
  nameUser.textContent = data.name;
  aboutUser.textContent = data.about;
  avatarUser.src = data.avatar;
  avatarUser.alt = data.name; 
}

function updateNameDescript(name, about){
  nameUser.textContent = name;
  aboutUser.textContent = about;
}

function updateImageAvatar(link){
  avatarUser.src = link;
}

  

export {enableUser, updateImageAvatar, updateNameDescript}