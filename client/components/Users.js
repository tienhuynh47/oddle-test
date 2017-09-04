import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Users = ({users, onClick}) => (
    <div className="row">
        {users.map((user, i) =>
            <div className="col" key={i}>
                <div className="card">
                    <Link to={'/' + user.id} onClick={(e) => onClick(user)}>
                        <div className="card-image">
                            <div className="hover">
                                <div className="hover-placeholder"></div>
                                <img className="avatar" src={user.avatar_url} />
                            </div>
                        </div>
                        <div className="card-content">
                            <h2 className="title">{user.login}</h2>
                            <p>{user.score}</p>
                        </div>
                    </Link>
                </div>
            </div>
        )}
    </div>
)

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Users
