import { data } from "autoprefixer";

export default class UserInfo {
    constructor({name, about, avatar, nameInput, aboutInput},
       {handleUpdateAvatar, handleUpdateProfile, handleGetUser}){
      this._nameSelector = document.querySelector(name);
      this._aboutSelector = document.querySelector(about);
      this._avatarSelector = document.querySelector(avatar);
      this._nameInput = document.querySelector(nameInput);
      this._aboutInput = document.querySelector(aboutInput);
      this._handleUpdateProfile = handleUpdateProfile;
      this._handleUpdateAvatar = handleUpdateAvatar;
      this._handleGetUser = handleGetUser;  
    }

    setUserData(data){
      this._fillInNameAndDescript(data.name, data.about);
      this._updateImageAvatar(data.avatar, data.name);
      return data._id;
    }

    getUserInfo(){
      return this._handleGetUser();
    }

    fillInProfileForm(){
      this._nameInput.value = this._nameSelector.textContent;
      this._aboutInput.value = this._aboutSelector.textContent;
    }
    
    _fillInNameAndDescript(name, about) {
      this._nameSelector.textContent = name;
      this._aboutSelector.textContent = about;
    }
  
    _updateImageAvatar(link, alt) {
      this._avatarSelector.src = link;
      this._avatarSelector.alt = alt;
    }

    setUserInfo(name, about){
      return this._handleUpdateProfile(name, about).then(
        this._fillInNameAndDescript(name, about)
      );
    }

    setAvatarImage(link) {
      return this._handleUpdateAvatar(link).then(
        this._updateImageAvatar(link, this._nameSelector.textContent)
      );
    }

}