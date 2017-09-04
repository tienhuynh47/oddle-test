import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Root from './components/Root'
import './styles/app.scss'

const store = configureStore()
const rootElement = document.getElementById('app')
import { BrowserRouter } from 'react-router-dom'

render(
    <Provider store={store}>
        <BrowserRouter>
            <Root/>
        </BrowserRouter>
    </Provider>,
    rootElement
)
