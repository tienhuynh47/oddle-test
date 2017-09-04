import {fetchUsers} from '../api'

export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SELECT_USER = 'SELECT_USER'
export const SELECT_USER_DETAIL = 'SELECT_USER_DETAIL'

export const selectUser = username => ({
    type: SELECT_USER,
    username
})

export const selectUserDetail = userDetail => ({
    type: SELECT_USER_DETAIL,
    userDetail
})

export const requestUsers = username => ({
    type: REQUEST_USERS,
    username
})

export const receiveUsers = (username, json) => ({
    type: RECEIVE_USERS,
    username,
    users: json.items
})

const shouldFetchUsers = (state, username) => {
    const users = state.githubUsers[username]
    if (!users) {
        return true
    }
    if (users.isFetching) {
        return false
    }
    return true
}

export const fetchUsersIfNeeded = username => (dispatch, getState) => {
    if (shouldFetchUsers(getState(), username)) {
        return dispatch(fetchUsers(username))
    }
}
