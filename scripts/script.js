//popup
const editCloseButton = document.querySelector('#close-edit-form');
const addCloseButton = document.querySelector('#close-add-form');
const imgCloseButton = document.querySelector('#close-img');
const containerImage = document.querySelector('#container-img');
const containerAdd = document.querySelector('#container-add');
const containerEdit = document.querySelector('#container-edit');
const popupAddCard  = document.querySelector('#popup-add');
const popupEditProfile = document.querySelector('#popup-edit');
const popupZoomImage = document.querySelector('#popup-img'); 

//form
const nameInput = document.querySelector('#name__input');
const descriptInput = document.querySelector('#description__input');
const nameCardInput = document.querySelector('#name-card-input');
const linkInput = document.querySelector('#link-input');
const formEdit = document.querySelector('#form-edit');
const formAdd = document.querySelector('#form-add');

//ZoomImage
const zoomImage = popupZoomImage.querySelector('.popup__zoom-image');
const zoomImageFigcaption = popupZoomImage.querySelector('.popup__figcaption');


//profile
const editButton = document.querySelector('#profile__edit-button');
const profileHeader = document.querySelector('#profile__name-header');
const profileDescript = document.querySelector('#profile__descript');
const addButton = document.querySelector('#profile__add-button');

//cards
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.cards');

//popup methods

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

function fillInFormInputs(){
  profileHeader.textContent = nameInput.value;
  profileDescript.textContent = descriptInput.value;
}

function submitFormEdit(){
  fillInFormInputs();
  closeEditPopup();
}


function submitFormAdd(){
  const card = {name: nameCardInput.value, link: linkInput.value}
  cardList.prepend(createCard(card));
  closeAddPopup();
}


function openAddPopup() {
  nameCardInput.value = '';
  linkInput.value = '';
  openPopup(popupAddCard);
}

function closeAddPopup() {
  closePopup(popupAddCard);
}

function fillInProfile() {
  nameInput.value = profileHeader.textContent.trim();
  descriptInput.value = profileDescript.textContent.trim();
}

function openEditPopup() {
  fillInProfile();
  openPopup(popupEditProfile);
}


function closeEditPopup(){
  closePopup(popupEditProfile);
}

function createImageForPopup(src, alt){
  zoomImage.src = src;
  zoomImage.alt = alt;
  zoomImageFigcaption.textContent = alt;
}

function openImagePopup(src, alt) {
  createImageForPopup(src, alt)
  openPopup(popupZoomImage);
}


function closeImagePopup(){
  closePopup(popupZoomImage);
}


editButton.addEventListener('click', () => {
  openEditPopup();
});

formEdit.addEventListener('submit', (event) => {
  event.preventDefault();
  submitFormEdit();
});

formAdd.addEventListener('submit', (event)=>{
  event.preventDefault();
  submitFormAdd();
});

addButton.addEventListener('click', () => {
  openAddPopup();
});

editCloseButton.addEventListener('click', () => {
  closeEditPopup();
});

addCloseButton.addEventListener('click', () => {
  closeAddPopup();
  
});

imgCloseButton.addEventListener('click',() => {
  closeImagePopup();
});


// Cards

function createCard(card) {

  const cardArticle = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage =  cardArticle.querySelector('.card__image');
  const cardLike = cardArticle.querySelector('.card__heart');
  const cardTrash = cardArticle.querySelector('.card__trash');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardArticle.querySelector('.card__text').textContent = card.name;
  
  cardLike.addEventListener('click', (event) => {
    event.target.classList.toggle('card__heart_active');
  });

  cardTrash.addEventListener('click', () => {
    const сurrentCard = cardTrash.closest('.card');
    сurrentCard.remove();
  });

  cardImage.addEventListener('click', (event)=> {
    const src = event.target.src;
    const alt = event.target.alt
    openImagePopup(src, alt);
  })

  return cardArticle;
}

function renderInitialCards (cards) {

    for(let i = 0; i < cards.length; i++) {
      const card = createCard(cards[i])
      cardList.append(card);
    }  
  }

renderInitialCards(initialCards);











