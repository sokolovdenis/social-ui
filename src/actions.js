export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SUBSCRIBE = 'SUBSCRIBE';
export const UNSUBSCRIBE = 'UNSUBSCRIBE';
export const LOAD_SUBS = 'LOAD_SUBS';

export const sign_in_action = (token, user_id, rememberme) => {
    return {
        type: SIGN_IN,
        token,
        user_id: user_id,
        rememberme: rememberme
    }
};

export const sign_out_action = () => {
    return {
        type: SIGN_OUT,
    }
};

export const subscribe_action = (user_id) => {
    return {
        type: SUBSCRIBE,
        user_id: user_id,
    }
};

export const unsubscribe_action = (user_id) => {
    return {
        type: UNSUBSCRIBE,
        user_id: user_id
    }
};

export const load_subs_action = (user_id_list) => {
    return {
        type: LOAD_SUBS,
        user_id_list
    }
};
