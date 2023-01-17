const nameCardInput = document.querySelector('#name-card-input');
const linkInput = document.querySelector('#link-input');

function clearInputsInFormAdd(){
  nameCardInput.value = '';
  linkInput.value = '';
}


export {clearInputsInFormAdd};