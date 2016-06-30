import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

export function createFinalStore (reducer, initialState) {
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  return store
}
