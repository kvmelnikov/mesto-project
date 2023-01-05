
function enableUser(data){
  const nameUser = document.querySelector('.profile__name-header');
  const aboutUser = document.querySelector('.profile__descript');
  const avatarUser = document.querySelector('.profile__avatar');
  nameUser.textContent = data.name;
  aboutUser.textContent = data.about;
  avatarUser.src = data.avatar;
  avatarUser.alt = data.name;  
}


function renderUser(){
  initialUser()
  }
  

export {enableUser}  