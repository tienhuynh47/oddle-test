import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectUser, selectUserDetail, fetchUsersIfNeeded } from '../actions'
import { Route } from 'react-router-dom'
import Search from '../components/Search'
import Users from '../components/Users'
import Detail from './Detail'

class App extends Component {
    static propTypes = {
        selectedUser: PropTypes.string.isRequired,
        users: PropTypes.array.isRequired,
        userDetail: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, selectedUser } = this.props
        dispatch(fetchUsersIfNeeded(selectedUser))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedUser !== this.props.selectedUser) {
            const { dispatch, selectedUser } = nextProps
            dispatch(fetchUsersIfNeeded(selectedUser))
        }
    }

    handleSearch = search => {
        this.props.dispatch(selectUser(search))
    }

    handleClick = userDetail => {
        this.props.dispatch(selectUserDetail(userDetail))
    }

    render() {
        const { selectedUser, users, userDetail, isFetching } = this.props
        const isEmpty = users.length === 0
        const isEmptyUserDetail = Object.keys(userDetail).length === 0 && this.props.location.pathname.length <= 1;

        return (
            <div className="container">
                { isEmptyUserDetail ?
                    <div>
                        <Search value={selectedUser} onSearch={this.handleSearch}/>
                        { isEmpty
                            ? (isFetching ? <h2 className="title">Loading...</h2> : <h2>No Users.</h2>)
                            : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                                <Users users={users} onClick={this.handleClick} />
                            </div>
                        }
                    </div>
                    : <Route path="/:id" component={Detail}/>
                }
            </div>
        )
    }
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
        selectedUser,
        users,
        userDetail,
        isFetching
    }
}

export default connect(mapStateToProps)(App)
