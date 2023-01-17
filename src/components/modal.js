
function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closePopupEscape)
}

function closePopupEscape(event) {
    if(event.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);  
}

export {closePopup, openPopup};