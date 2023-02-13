import { data } from "autoprefixer";

export default class UserInfo {
    constructor({name, about, avatar}){
      this._nameSelector = document.querySelector(name);
      this._aboutSelector = document.querySelector(about);
      this._avatarSelector = document.querySelector(avatar); 
    }

    setUserData(data){
      this._userData = data
      this._fillInNameAndDescript(data.name, data.about);
      this.updateImageAvatar(data.avatar, data.name);
      return data._id;
    }

    getUserInfo(){
      return this._userData
    }


    _fillInNameAndDescript(name, about) {
      this._nameSelector.textContent = name;
      this._aboutSelector.textContent = about;
    }
  
    updateImageAvatar(link, alt) {
      this._avatarSelector.src = link;
      this._avatarSelector.alt = alt;
    }


}