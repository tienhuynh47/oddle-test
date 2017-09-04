import { combineReducers } from 'redux'
import { githubUsers, selectedUser, userDetail } from './user'
import { githubRepos, selectedRepo } from './repo'

const rootReducer = combineReducers({
    githubUsers,
    selectedUser,
    userDetail,
    githubRepos,
    selectedRepo
})

export default rootReducer
