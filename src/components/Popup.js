export default class Popup {
    
    constructor(selector){
      this._selector = selector;
      this._popup = document.querySelector(this._selector);
    }

    _handleEscClose(e){
         if(e.key === "Escape") {
              this.close();
          }
    }
    
    open(){
      console.log('open popup')
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown',(e)=>{
        this._handleEscClose(e);
      });
    }

    close(){
      this._popup.classList.remove('popup_opened')
      document.removeEventListener('keydown', this._handleEscClose)
    }

    // setEventListeners(){

    // }

}

// function closePopup(popup) {
//   popup.classList.remove('popup_opened')
//   document.removeEventListener('keydown', closePopupEscape)
// }



// function closePopupEscape(event) {
//   if(event.key === "Escape") {
//       const openedPopup = document.querySelector('.popup_opened')
//       closePopup(openedPopup);
//   }
// }

// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupEscape);
    
// }