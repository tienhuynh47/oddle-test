import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectRepo, fetchReposIfNeeded } from '../actions/repo'
import { Link } from 'react-router-dom'
import Repos from '../components/Repos'

class Detail extends Component {

    constructor() {
        super()
        this.user = {
            url: '',
            gists_url: '',
            repos_url: ''
        }
        this.filterUsers = []
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        users: PropTypes.array.isRequired,
        userDetail: PropTypes.object.isRequired,
        githubRepos: PropTypes.object.isRequired
    }

    componentWillReceiveProps(nextProps) {
        if (Object.keys(nextProps.userDetail).length === 0 && !this.user.url && nextProps.users.length > 0) {
            this.filterUsers = nextProps.users.filter((user) => {
                return user.login === this.props.match.params.login
            })
            this.user = this.filterUsers.length > 0 ? this.filterUsers[0] : {
                url: '',
                gists_url: '',
                repos_url: ''
            }
            this.props.dispatch(fetchReposIfNeeded(this.user.login))
        }
    }

    componentDidMount() {
        if (Object.keys(this.props.userDetail).length > 0) {
            this.props.dispatch(fetchReposIfNeeded(this.props.userDetail.login))
        }
    }

    onBack = () => {
        this.props.dispatch(selectUserDetail({}))
    }

    render() {
        const { match, users, userDetail, githubRepos, isRepoFetching } = this.props
        const user = Object.keys(userDetail).length === 0 ? this.user : userDetail
        const repos = githubRepos[user.login] ? githubRepos[user.login].items : []
        const isEmpty = repos.length === 0

        return (
            <div>
                <Link to="/" className="back-btn" onClick={this.onBack}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</Link>
                <div className="detail">
                    <div className="card">
                        <div className="card-left">
                            <h3>{user.login}</h3>
                            <img className="avatar" src={user.avatar_url} />
                        </div>
                        <div className="card-right">
                            <div className="card-content">
                                <p>
                                    Id: {user.id}
                                </p>
                                <p>
                                    Type: {user.type}
                                </p>
                                <p>
                                    Score: {user.score}
                                </p>
                                <p>
                                    Url: <Link target="_blank" to={user.url}>{user.url}</Link>
                                </p>
                                <p>
                                    Gists Url: <Link target="_blank" to={user.gists_url}>{user.gists_url}</Link>
                                </p>
                                <p>
                                    Repos Url: <Link target="_blank" to={user.repos_url}>{user.repos_url}</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    { isEmpty
                        ? (isRepoFetching ? <h2 className="title">Loading...</h2> : <h2>No Users.</h2>)
                        : <div style={{ opacity: isRepoFetching ? 0.5 : 1 }}>
                            <Repos repos={repos} />
                        </div>
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { githubUsers, selectedUser, userDetail } = state
    const {
        items: users
    } = githubUsers[selectedUser] || {
        items: []
    }

    const { githubRepos, selectedRepo } = state

    const {
        isRepoFetching,
    } = githubRepos[selectedRepo] || {
        isRepoFetching: true,
    }

    return {
        users,
        userDetail,
        githubRepos,
        isRepoFetching
    }
}

export default connect(mapStateToProps)(Detail)
