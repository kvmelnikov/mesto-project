import './styles/pages/index.css';

import {
    forms,
    popups,
    configValidate,
    configProfile,
    configForPopupImage,
    configCard
} from './components/constants';

import Api from './components/Api.js';
import UserInfo from './components/UserInfo.js';
import Card from "./components/Card.js";
import FormValidator from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm.js';
import Section from "./components/Section";
import PopupWithImage from "./components/PopupWithImage";

let cardList;
let userId;

const popupImage = new PopupWithImage(configForPopupImage);

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18',
    headers: {
        authorization: '95e1c598-7d7b-4945-aa63-eed177f7d6d7',
        'Content-Type': 'application/json'
    }
})

const handlersForCard = {
    handleClick: (link, name) => {
        popupImage.open(link, name);
        popupImage.setEventListeners();
    },
    handleDelete: (id) => {
        api.deleteCardApi(id);
    },
    handleLike: (id) => {
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
    handleGetUser: () => {
        return api.initialUser();
    }
}

const userInfo = new UserInfo(configProfile, handlersForUser)


function createCard(cardItem) {
    const card = new Card(
        cardItem,
        handlersForCard,
        userId,
        configCard
    )
    const cardElement = card.generate();
    return cardElement
}

Promise.all([api.initialUser(), api.getCards()])
    .then(([userData, dataCards]) => {
        userId = userInfo.setUserData(userData);
        cardList = new Section({
            data: dataCards,
            renderer: (cardItem) => {
                const cardElement = createCard(cardItem);
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

const formProfileValidate = new FormValidator(configValidate, forms.formProfile);
formProfileValidate.enableValidation();

const formCardValidate = new FormValidator(configValidate, forms.formCard);
formCardValidate.enableValidation();

const formAvatarValidate = new FormValidator(configValidate, forms.formAvatar);
formAvatarValidate.enableValidation();


const popupProfileForm = new PopupWithForm({
    selector: '#popup-edit',
    handleSubmiter: (event, values) => {
        const makeRequest = () => {
            return api.sendEditUser(values.name, values.description)
                .then((userData) => {
                    userInfo.fillInNameAndDescript(userData.name, userData.about);
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
                const cardElement = createCard(cardData);
                cardList.addItemFront(cardElement);
                event.target.reset();
                popupCardForm.close();
            });
        }
        handleSubmit(makeRequest, event);
    },
});
popupCardForm.setEventListeners()
// const handlersForUser = {
//     handleUpdateAvatar: (link) => {
//         return api.updateAvatarQuery(link);
//     },

//     handleUpdateProfile: (name, about) => {
//         return api.sendEditUser(name, about);
//     },

//     handleGetUser: () => {
//         return api.initialUser();
//     }
// }


const popupAvatarForm = new PopupWithForm({
        selector: '#popup-edit-avatar',
        handleSubmiter: (event, values) => {
            const makeRequest = () => {
                return api.updateAvatarQuery(values.link)
                    .then(data => {
                        userInfo.updateImageAvatar(data.avatar, data.name)
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
    userInfo.getUserInfo().then(infoObject => {
        configProfile.nameInput.value = infoObject.name;
        configProfile.aboutInput.value = infoObject.about;
        popupProfileForm.open();
    });
}



popups.popupProfileOpenButton.addEventListener('click', openEditPopup);

function openAddPopup() {
    popupCardForm.open();
}


popups.popupCardOpenButton.addEventListener('click', () => {
    openAddPopup();
});

function openAvatarEdit() {
    popupAvatarForm.open();
}

popups.popupAvatarOpenButton.addEventListener('click', openAvatarEdit);


