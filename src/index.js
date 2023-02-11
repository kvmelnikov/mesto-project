import './styles/pages/index.css';

import {openPopup, closePopup} from "./components/modal.js";
import {enableValidation} from "./components/validate.js";
import Card, {renderInitialCards} from "./components/Card.js";
import {setUserData, fillInNameAndDescript, updateImageAvatar, fillInProfile} from "./components/user.js";
import {initialUser, getCards, sendEditUser, addCardQuery, updateAvatarQuery} from "./components/api-old.js";
import {
    formProfile, formCard, formAvatar,
    popups, popupAvatar, popupCard, popupProfile, popupProfileOpenButton,
    popupCardOpenButton, popupAvatarOpenButton, config, largeImageFigcaption
} from './components/constants';



import FormValidator from './components/FormValidator.js';
import Popup from './components/Popup.js';
import PopupWithForm from './components/PopupWithForm.js';
import Api from './components/Api.js';
import Section from "./components/Section";
import PopupWithImage from "./components/PopupWithImage";


const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18',
    headers: {
        authorization: '95e1c598-7d7b-4945-aa63-eed177f7d6d7',
        'Content-Type': 'application/json'
    }
})

let cardList;
let userId;

const popupImage = new PopupWithImage({
    selector: '.popup_type_image',
    zoomImage: '.popup__zoom-image',
    figcaption: '.popup__figcaption'
});

const handlersForCard = {
    handleClick: (link, name) => {                      
        popupImage.open(link, name);                        
    },
    handleDelete:(id) => {
        api.deleteCardApi(id);
    },
    handleLike:(id) => {
       return api.addLikeCardApi(id);
    },
    handleDeleteLike: (id) => {
        return api.deleteLikeCardApi(id);
    },
    handleDelete: (id) => {
        return api.deleteCardApi(id);
    }

}


popupImage.setEventListeners()

Promise.all([api.initialUser(), api.getCards()])
    .then(([userData, dataCards]) => {
        userId = setUserData(userData);
        console.log(dataCards)
        cardList = new Section({
            data: dataCards,
            renderer: (cardItem) => {
                const card = new Card(
                    cardItem,
                    handlersForCard,
                    userId,
                    '.card'
                )
                const cardElement = card.generate();
                cardList.addItemBack(
                    cardElement)
            },

        }, '.cards')
        cardList.renderItems();
    })

    .catch(err => {
        console.log(err)
    });

// forms

const formProfileValidate = new FormValidator(config, formProfile);
formProfileValidate.enableValidation();

const formCardValidate = new FormValidator(config, formCard);
formCardValidate.enableValidation();

const formAvatarValidate = new FormValidator(config, formAvatar);
formAvatarValidate.enableValidation();


const popupProfileForm = new PopupWithForm({
    selector: '#popup-edit',
    handleSubmiter: (event, values) => {
        const makeRequest = () => {
            return api.sendEditUser(values.name, values.description)
                .then((userData) => {
                    fillInNameAndDescript(userData.name, userData.about);
                    popupProfileForm.close();
                })
        }
        handleSubmit(makeRequest, event);
    },
});
popupProfileForm.setEventListeners()


const popupCardForm = new PopupWithForm({
    selector: '#popup-add',
    handleSubmiter: (event, values) => {
        const makeRequest = () => {
            return api.addCardQuery(values.placeName, values.link).then((cardData) => {
                const card = new Card(cardData,
                    handlersForCard,
                    userId,
                    '.card');
                const cardElement = card.generate();
                cardList.addItemFront(cardElement);
                event.target.reset();
                popupCardForm.close();
            });
        }
        handleSubmit(makeRequest, event);
    },
});
popupCardForm.setEventListeners()


const popupAvatarForm = new PopupWithForm({
        selector: '#popup-edit-avatar',
        handleSubmiter: (event, values) => {
            const makeRequest = () => {
                return api.updateAvatarQuery(values.link)
                    .then(data => {
                        updateImageAvatar(data.avatar, data.name);
                        event.target.reset();
                        popupAvatarForm.close();
                    });
            }
            handleSubmit(makeRequest, event)
        }
    }
)

popupAvatarForm.setEventListeners()


function handleSubmit(request, evt, loadingText = "Сохранение...") {

    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, loadingText);

    request()
        .then(() => {
            evt.target.reset();

        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, submitButton, initialText);
        });
}


function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
    if (isLoading) {
        button.textContent = loadingText
    } else {
        button.textContent = buttonText
    }
}

//modals

function openEditPopup() {
    fillInProfile();
    popupProfileForm.open();
}

popupProfileOpenButton.addEventListener('click', openEditPopup);

function openAddPopup() {
    popupCardForm.open();
}


popupCardOpenButton.addEventListener('click', () => {
    openAddPopup();
});

function openAvatarEdit() {
    popupAvatarForm.open();
}

popupAvatarOpenButton.addEventListener('click', openAvatarEdit);


// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//       if (evt.target.classList.contains('popup_opened')) {
//           closePopup(popup)
//       }
//       if (evt.target.classList.contains('popup__close')) {
//         closePopup(popup)
//       }
//   })
// })


export {userId};