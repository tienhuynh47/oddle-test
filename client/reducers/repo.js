import { combineReducers } from 'redux'
import {
    REQUEST_REPOS, RECEIVE_REPOS, SELECT_REPO
} from '../actions/repo'

export const selectedRepo = (state = '', action) => {
    switch (action.type) {
        case SELECT_REPO:
            return action.username
        default:
            return state
    }
}

export const repos = (state = {
    isRepoFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case REQUEST_REPOS:
            return {
                ...state,
                isRepoFetching: true
            }
        case RECEIVE_REPOS:
            return {
                ...state,
                isRepoFetching: false,
                items: action.repos
            }
        default:
            return state
    }
}

export const githubRepos = (state = {}, action) => {

    switch (action.type) {
        case RECEIVE_REPOS:
        case REQUEST_REPOS:
            return {
                ...state,
                [action.username]: repos(state[action.username], action)
            }
        default:
            return state
    }
}
