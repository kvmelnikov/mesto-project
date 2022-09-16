//popup
const editCloseButton = document.querySelector('#close-edit-form');
const addCloseButton = document.querySelector('#close-add-form');
const imgCloseButton = document.querySelector('#close-img');
const containerImage = document.querySelector('#container-img');
const containerAdd = document.querySelector('#container-add');
const containerEdit = document.querySelector('#container-edit');

//form
const nameInput = document.querySelector('#name__input');
const descriptInput = document.querySelector('#description__input');
const nameCardInput = document.querySelector('#name-card-input');
const linkInput = document.querySelector('#link-input');
const formButtonEdit = document.querySelector('#form-button-edit');
const formButtonAdd = document.querySelector('#form-button-add');

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
  containerAdd.style.display = 'flex';
  const currentPopup = document.querySelector('#popup-add');
  openPopup(currentPopup);
}

function closeAddPopup() {
  containerAdd.style.display = 'none';
  const currentPopup = document.querySelector('#popup-add');
  closePopup(currentPopup);
}


function openEditPopup() {
  const formEdit = document.querySelector('#form-edit');
  currentCloseButton = document.querySelector('#close-edit-form');
  nameInput.value = profileHeader.textContent.trim();
  descriptInput.value = profileDescript.textContent.trim();
  containerEdit.style.display = 'flex';
  const currentPopup = document.querySelector('#popup-edit');
  openPopup(currentPopup);
}


function closeEditPopup(){
  containerEdit.style.display = 'none';
  const currentPopup = document.querySelector('#popup-edit');
  closePopup(currentPopup);
}


function openImagePopup(src, alt) {
  const zoomImage = document.querySelector('.popup__zoom-image');
  zoomImage.src = src;
  zoomImage.alt = alt;
  document.querySelector('.popup__figcaption').textContent = alt;
  containerImage.style.display = "flex";
  const currentPopup = document.querySelector('#popup-img');
  openPopup(currentPopup);
}


function closeImagePopup(){
  containerImage.style.display = "none";
  const currentPopup = document.querySelector('#popup-img');
  closePopup(currentPopup);
}


editButton.addEventListener('click', () => {
  openEditPopup();
});

formButtonEdit.addEventListener('click', (event) => {
  event.preventDefault();
  submitFormEdit();
});

formButtonAdd.addEventListener('click', (event)=>{
  event.preventDefault();
  submitFormAdd();
});

addButton.addEventListener('click', () => {
  openAddPopup('#popup-edit');
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











