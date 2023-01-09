let buttonForm;

function savedStart(button){
  currentTextButton = buttonForm.textContent;
  buttonForm.textContent = "C";
}

function savedEnd(){
  buttonForm.textContent = currentTextButton;
}
export {savedStart, savedEnd}