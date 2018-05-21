import Cookies from 'universal-cookie';

const cookies = new Cookies();
let cookiesToken = cookies.get('token');
let cookiesUserId = cookies.get('user_id');

export default (state = {token: cookiesToken, currentUserId: cookiesUserId}, action) => {
    const cookies = new Cookies();
    switch (action.type) {
        case 'SET_TOKEN':
            if (action.doRemember) {
                cookies.set('token', action.token, {path: '/'});
            }
            return {
                token: action.token,
                currentUserId: state.currentUserId,
            };
        case 'DELETE_TOKEN':
            cookies.remove('token', { path: '/' });
            cookies.remove('user_id', { path: '/' });
            return {
                token: null,
                currentUserId: null,
            };
        case 'SET_CURRENT_USER_ID':
            cookies.set('user_id', action.userId, {path: '/'});
            console.log(action.userId);
            return {
                token: state.token,
                currentUserId: action.userId,
            };
        default:
            return state;
    }
}
