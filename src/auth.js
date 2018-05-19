import {set_cookie, get_cookie, erase_cookie} from './cookies'

let api_token = null;

export function is_logged_in() {
    if (api_token === null) {
        api_token = get_cookie('token');
        return api_token !== null;
    }
    return true;
}

export function login(token, remember) {
    api_token = token;
    if (remember) {
        set_cookie('token', token, 30)
    } else {
        set_cookie('token', token, 1.0 / 24 / 60 / 6)
    }
    window.location.replace("/");
}