import { combineReducers } from 'redux'
import {
    REQUEST_USERS, RECEIVE_USERS, SELECT_USER, SELECT_USER_DETAIL
} from '../actions'

const selectedUser = (state = 'tom', action) => {
    switch (action.type) {
        case SELECT_USER:
            return action.username
        default:
            return state
    }
}

const users = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case REQUEST_USERS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_USERS:
            return {
                ...state,
                isFetching: false,
                items: action.users
            }
        default:
            return state
    }
}

const githubUsers = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
        case REQUEST_USERS:
        case SELECT_USER_DETAIL:
            return {
                ...state,
                [action.username]: users(state[action.username], action)
            }
        default:
            return state
    }
}

const userDetail = (state = {}, action) => {
    switch (action.type) {
        case SELECT_USER_DETAIL:
            return action.userDetail
        default:
            return state
    }
}

const rootReducer = combineReducers({
    githubUsers,
    selectedUser,
    userDetail
})

export default rootReducer
