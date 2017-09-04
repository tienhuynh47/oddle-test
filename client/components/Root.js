import React from 'react'
import { Route } from 'react-router-dom'
import App from '../containers/App'

const Root = () => (
    <div>
        <Route path="/" component={App}></Route>
    </div>
)

export default Root
