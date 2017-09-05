/* eslint-disable no-console, no-use-before-define */

import path from 'path'
import Express from 'express'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'

import configureStore from '../client/store/configureStore'
import Root from '../client/components/Root'

const app = new Express()
const port = process.env.PORT || 9000

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

const handleRender = (req, res) => {
    // Create a new Redux store instance
    const context = {}
    const store = configureStore()
    // Render the component to a string
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <Root />
            </StaticRouter>
        </Provider>
    )
    // Grab the initial state from our Redux store
    const finalState = store.getState()
    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState))
}

// This is fired every time the server side receives a request
app.use(handleRender)

const renderFullPage = (html, preloadedState) => {
    return `
        <!doctype html>
        <html>
            <head>
                <title>Oddle Test</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            	<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
                <link rel="stylesheet" type="text/css" href="/static/app.css">
            </head>
            <body>
                <div id="app">${html}</div>
                <script src="/static/bundle.js"></script>
            </body>
        </html>
        `
}

app.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.info(`==> Listening on port ${port}.`)
    }
})
