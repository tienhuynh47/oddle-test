import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Repoes = ({ repos }) => {
    return (
        <div className="repos-container">
            <div className="row">
                {repos.map((repo, i) =>
                    <div className="col-3" key={i}>
                        <div className="card">
                            <div className="card-content">
                                <h2 className="title" title={repo.name}><Link to={repo.url} target="_blank">{repo.name}</Link></h2>
                                <p className="description" title={repo.description}>{repo.description}</p>
                                <p><i className="fa fa-asterisk red" aria-hidden="true"></i> {repo.language} <span className="pull-right"><i className="fa fa-star yellow" aria-hidden="true"></i> {repo.watchers_count} <i className="fa fa-code-fork blue" aria-hidden="true"></i> {repo.forks}</span></p>
                                <p>{new Date(repo.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

Repoes.propTypes = {
    repos: PropTypes.array.isRequired
}

export default Repoes
