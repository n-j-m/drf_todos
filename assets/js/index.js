import React from 'react'
import { render } from 'react-dom'
import App from './app'
import { createFinalStore } from './store'
import { Provider } from 'react-redux'
import todosReducer from './todos-reducer'

const store = createFinalStore(todosReducer, {
  fetching: false,
  todos: []
})

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'))
