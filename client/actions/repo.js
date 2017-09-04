import {fetchRepos} from '../api'

export const REQUEST_REPOS = 'REQUEST_REPOS'
export const RECEIVE_REPOS = 'RECEIVE_REPOS'
export const SELECT_REPO = 'SELECT_REPO'

export const selectRepo = username => ({
    type: SELECT_REPO,
    username
})

export const requestRepos = username => ({
    type: REQUEST_REPOS,
    username
})

export const receiveRepos = (username, json) => ({
    type: RECEIVE_REPOS,
    username,
    repos: json
})

const shouldFetchRepos = (state, username) => {
    const repos = state.githubRepos[username]
    if (!repos) {
        return true
    }
    if (repos.isRepoFetching) {
        return false
    }
    return true
}

export const fetchReposIfNeeded = username => (dispatch, getState) => {
    if (shouldFetchRepos(getState(), username)) {
        return dispatch(fetchRepos(username))
    }
}
