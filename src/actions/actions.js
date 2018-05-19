export const setToken = (token, doRemember) => ({
    type: 'SET_TOKEN',
    token,
    doRemember,
});

export const deleteToken = () => ({
    type: 'DELETE_TOKEN'
});
