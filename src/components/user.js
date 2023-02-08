const nameUser = document.querySelector('.profile__name-header');
const aboutUser = document.querySelector('.profile__descript');
const avatarUser = document.querySelector('.profile__image');
const buttonAvatar = document.querySelector('#edit-image-profile');
const nameInput = document.querySelector('#name-input');
const descriptInput = document.querySelector('#description-input');
const profileHeader = document.querySelector('#profile__name-header');
const profileDescript = document.querySelector('#profile__descript');

function setUserData(data) {
    fillInNameAndDescript(data.name, data.about);
    updateImageAvatar(data.avatar, data.name);
    return data._id;
}

function fillInNameAndDescript(name, about) {
    nameUser.textContent = name;
    aboutUser.textContent = about;
}

function updateImageAvatar(link, alt) {
    avatarUser.src = link;
    avatarUser.alt = alt;
}

function fillInProfile() {
    nameInput.value = profileHeader.textContent.trim();
    descriptInput.value = profileDescript.textContent.trim();
}

export {setUserData, updateImageAvatar, fillInNameAndDescript, fillInProfile}