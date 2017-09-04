import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Detail = ({ match, dispatch, users, userDetail }) => {

    let user = userDetail || {
        url: '',
        html_url: '',
        followers_url: '',
        following_url: '',
        gists_url: '',
        starred_url: '',
        subscriptions_url: '',
        organizations_url: '',
        repos_url: '',
        events_url: '',
        received_events_url: ''
    }
    let filterUsers = []
    if (Object.keys(user).length === 0) {
        filterUsers = users.filter((user) => {
            return Number(user.id) === Number(match.params.id)
        })
        user = filterUsers.length > 0 ? filterUsers[0] : {
            url: '',
            html_url: '',
            followers_url: '',
            following_url: '',
            gists_url: '',
            starred_url: '',
            subscriptions_url: '',
            organizations_url: '',
            repos_url: '',
            events_url: '',
            received_events_url: ''
        }
    }

    const onBack = () => {
        dispatch(selectUserDetail({}))
    }
    return (
        <div>
            <Link to="/" className="back-btn" onClick={onBack}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</Link>
            <div className="detail">
                <div className="card">
                    <div className="card-left">
                        <h3>{user.login}</h3>
                        <img className="avatar" src={user.avatar_url} />
                        <p>
                            Id: {user.id}
                        </p>
                        <p>
                            Type: {user.type}
                        </p>
                        <p>
                            Site Admin: {user.site_admin ? 'Yes' : 'No'}
                        </p>
                        <p>
                            Score: {user.score}
                        </p>
                    </div>
                    <div className="card-right">
                        <div className="card-content">
                            <p>
                                Url: <Link target="_blank" to={user.url}>{user.url}</Link>
                            </p>
                            <p>
                                Html Url: <Link target="_blank" to={user.html_url}>{user.html_url}</Link>
                            </p>
                            <p>
                                Followers Url: <Link target="_blank" to={user.followers_url}>{user.followers_url}</Link>
                            </p>
                            <p>
                                Following Url: <Link target="_blank" to={user.following_url}>{user.following_url}</Link>
                            </p>
                            <p>
                                Gists Url: <Link target="_blank" to={user.gists_url}>{user.gists_url}</Link>
                            </p>
                            <p>
                                Starred Url: <Link target="_blank" to={user.starred_url}>{user.starred_url}</Link>
                            </p>
                            <p>
                                Subscriptions Url: <Link target="_blank" to={user.subscriptions_url}>{user.subscriptions_url}</Link>
                            </p>
                            <p>
                                Organizations Url: <Link target="_blank" to={user.organizations_url}>{user.organizations_url}</Link>
                            </p>
                            <p>
                                Repos Url: <Link target="_blank" to={user.repos_url}>{user.repos_url}</Link>
                            </p>
                            <p>
                                Events Url: <Link target="_blank" to={user.events_url}>{user.events_url}</Link>
                            </p>
                            <p>
                                Received_events Url: <Link target="_blank" to={user.received_events_url}>{user.received_events_url}</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    const { githubUsers, selectedUser, userDetail } = state
    const {
        isFetching,
        items: users
    } = githubUsers[selectedUser] || {
        isFetching: true,
        items: []
    }

    return {
        users,
        userDetail
    }
}

export default connect(mapStateToProps)(Detail)
