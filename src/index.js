import './styles/pages/index.css';

import { formProfile, formCard, formAvatar, popupProfileOpenButton,
    popupCardOpenButton, popupAvatarOpenButton, config}  from './components/constants';

import UserInfo from './components/UserInfo.js';
import Card, {renderInitialCards} from "./components/Card.js";
import FormValidator from './components/FormValidator.js';
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

const profile = {
    name: '.profile__name-header',
    about: '.profile__descript',
    avatar: '.profile__image',
    nameInput: '#name-input',
    aboutInput: '#description-input'
}

const popupImage = new PopupWithImage({
    selector: '.popup_type_image',
    zoomImage: '.popup__zoom-image',
    figcaption: '.popup__figcaption'
});

popupImage.setEventListeners()


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

const handlersForUser = {
    handleUpdateAvatar: (link) => {
        return api.updateAvatarQuery(link);
    },

    handleUpdateProfile: (name, about) => {
        return api.sendEditUser(name, about);
    },

    handleGetUser: () => {
        return api.initialUser();
    }
}

const userInfo = new UserInfo(profile, handlersForUser)

Promise.all([userInfo.getUserInfo(), api.getCards()])
    .then(([userData, dataCards]) => {
        userId = userInfo.setUserData(userData);

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
        userInfo.setUserInfo(values.name, values.description)
        const makeRequest = () => {
            return userInfo.setUserInfo(values.name, values.description)
                .then((userData) => {
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
                return userInfo.setAvatarImage(values.link)
                    .then(data => {
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
    //fillInProfile();
    userInfo.fillInProfileForm()
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


export {userId};