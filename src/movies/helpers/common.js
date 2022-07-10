import jwt from "jsonwebtoken";
const KEY_TOKEN = "REACT_JS";

function isEmptyObject(obj) {
  for (let prop in obj) {
    //hasOwnProperty kiểm tra object có tồn tại key k
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}
function saveTokenToLocalStorage(token) {
  if (token !== null && token !== "") {
    localStorage.setItem("Token_Login", token);
  }
}
function removeToken(token) {
  localStorage.removeItem("Token_Login", token);
  window.location.href = "/";
}
function getTokenLocalStorage() {
  let token = localStorage.getItem("Token_Login");
  return token;
}
function decryptToken() {
  let token_decryptToken = getTokenLocalStorage();
  let decode = {};
  if (token_decryptToken !== null && token_decryptToken !== "") {
    decode = jwt.verify(token_decryptToken, KEY_TOKEN);
  }
  return decode;
}

function getEmail() {
  let infoUser = decryptToken();
  if (infoUser.hasOwnProperty("id")) {
    return infoUser.email;
  }
  return null;
}
// save password to local
function savePasswordToLocal() {
  let infoLogin = localStorage.setItem("Status", getTokenLocalStorage());
  return infoLogin;
}

function getPasswordToLocal() {
  let token = localStorage.getItem("Status");
  return token;
}
function RemovePasswordToLocal() {
  localStorage.removeItem("Status");
}

function getPasswordLogin() {
  let Token_remberPassowrd = getPasswordToLocal();
  let decode = null;
  if (Token_remberPassowrd !== null && Token_remberPassowrd !== "") {
    decode = jwt.verify(Token_remberPassowrd, KEY_TOKEN);
  }
  return decode;
}
function fakeAuthLogin() {
  let user_id = getEmail();
  if (user_id !== null) {
    return true;
  }
  return false;
}
export const helper = {
  isEmptyObject,
  saveTokenToLocalStorage,
  removeToken,
  getTokenLocalStorage,
  getEmail,
  fakeAuthLogin,
  savePasswordToLocal,
  getPasswordLogin,
  RemovePasswordToLocal,
};
