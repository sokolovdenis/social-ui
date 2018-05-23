const authKey = 'socialAuthKey'


function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

function deleteCookie(cname) {
    setCookie(cname, 0, -9000);
}

export function isAuthenticated() {
  return (getCookie(authKey) !== null) || (sessionStorage.getItem(authKey) !== null)
}

export function setAuthentication(token, longTime) {
  if(longTime) {
    setCookie(authKey, token, 365);
  } else {
    sessionStorage.setItem(authKey, token);
  }
}

export function unauthenticate() {
  sessionStorage.removeItem(authKey);
  deleteCookie(authKey);
}

export function getAuthHeader() {
  let key = ""
  if(getCookie(authKey) !== null) {
    key += getCookie(authKey)
  } else {
    key += sessionStorage.getItem(authKey);
  }
  return "Bearer " + key;
}
