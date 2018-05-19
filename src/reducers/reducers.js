import Cookies from 'universal-cookie';

const cookies = new Cookies();
let cookiesToken = cookies.get('token');
let userId = cookies.get('user_id');

userId = 67;

export default (state = {token: cookiesToken, currentUserId: userId}, action) => {
    const cookies = new Cookies();
    switch (action.type) {
        case 'SET_TOKEN':
            if (action.doRemember) {
                cookies.set('token', action.token, {path: '/'});
                cookies.set('user_id', userId, {path: '/'});
            }
            return {
                token: action.token,
                currentUserId: userId,
            };
        case 'DELETE_TOKEN':
            cookies.remove('token', { path: '/' });
            cookies.remove('user_id', { path: '/' });
            return {
                token: null,
                currentUserId: null,
            };
        default:
            return state;
    }
}
