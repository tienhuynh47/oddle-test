import {requestUsers, receiveUsers} from '../actions'
import {requestRepos, receiveRepos} from '../actions/repo'

export const fetchUsers = username => dispatch => {
    dispatch(requestUsers(username))
    return fetch(`https://api.github.com/search/users?q=${username}`)
        .then(response => response.json())
        .then(json => dispatch(receiveUsers(username, json)))
}

export const fetchRepos = username => dispatch => {
    dispatch(requestRepos(username))
    return fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(json => dispatch(receiveRepos(username, json)))
}
