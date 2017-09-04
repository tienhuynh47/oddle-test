import React from 'react'
import PropTypes from 'prop-types'

const Search = ({ value, onSearch }) => {
    let input

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!input.value.trim()) {
                  return
                }
                onSearch(input.value);
                input.value = ''
            }}>
                <input ref={node => { input = node }} className="input" placeholder="Search user"/>
                <button className="search-btn"><i className="fa fa-search"></i></button>
            </form>
        </div>
    )
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired
}

export default Search
