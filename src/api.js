const api_prefix = 'https://social-webapi.azurewebsites.net/'

export const api_login = api_prefix + '/api/identity/signin'
export const api_register = api_prefix + '/api/identity/signup'
export const api_users_all = api_prefix + '/api/users'
export const api_users_info = uid => api_prefix + '/api/users/' + String(uid)
export const api_me = api_prefix + '/api/users/me'
export const api_followings = uid => api_prefix + '/api/users/' + String(uid) + '/followings'
export const api_follow = uid => api_prefix + '/api/users/me/followings/' + String(uid)
export const api_feed = uid => api_prefix + '/api/users/' + String(uid) + '/posts/feed'
export const api_wall = uid => api_prefix + '/api/users/' + String(uid) + '/posts/wall'
export const api_post = api_prefix + '/api/users/me/posts'
export const api_post_image = id => api_prefix + '/api/users/me/posts/' + id + '/image'