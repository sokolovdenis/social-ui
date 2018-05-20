import {set_cookie, get_cookie, erase_cookie} from './cookies'
import {API_URL} from './settings'

let api_token = null;
let user_id = null;

export function is_logged_in() {
    if (api_token === null) {
        const cookie = get_cookie('token');
        if (cookie == null) {
            return false;
        }
        api_token = cookie.split('\t')[0];
        user_id = cookie.split('\t')[1];
        return api_token !== null;
    }
    return true;
}

function check_code(response) {
    if (response.status !== 200) {
        if (response.status === 401) {
            alert('Auth error')
        }
        if (response.status === 404) {
            alert('No user')
        }
        return;
    }
    return response.json()
}

function save_and_redir(json, token, remember) {
    console.log(json);
    user_id = json.id;
    let cookie = token + '\t' + user_id;
    if (remember) {
        set_cookie('token', cookie, 30)
    } else {
        set_cookie('token', cookie, 1.0 / 24 / 60 / 6)
    }
    window.location.replace("/");
}

export function login(token, remember) {
    api_token = token;
    fetch(API_URL + 'users/me', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(response => check_code(response))
        .then(json => save_and_redir(json, token, remember))
        .catch(function (error) {
            console.log('Request failed', error)
        });

}

export function get_token() {
    return api_token;
}

export function get_id() {
    return user_id;
}