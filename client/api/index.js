import {requestUsers, receiveUsers} from '../actions'

export const fetchUsers = username => dispatch => {
    dispatch(requestUsers(username))
    return fetch(`https://api.github.com/search/users?q=${username}`)
        .then(response => response.json())
        .then(json => dispatch(receiveUsers(username, json)))
}
