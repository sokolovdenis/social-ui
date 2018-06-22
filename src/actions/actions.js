export const setCurrentUserId = (userId) => ({
    type: 'SET_CURRENT_USER_ID', userId,
});

export const setToken = (token, doRemember) => ({
    type: 'SET_TOKEN', token, doRemember,
});

export const deleteToken = () => ({
    type: 'DELETE_TOKEN'
});
