import { combineReducers } from 'redux'

import {
  FETCHING,
  FETCHING_COMPLETE,
  ADD_TODO_COMPLETE,
  FETCH_TODOS_COMPLETE,
  UPDATE_TODO_COMPLETE,
  REMOVE_TODO_COMPLETE
} from './todos-actions'

function todoWithId (todos, id) {
  return todos.filter(todo => todo.id === id)[0]
}

function fetching (state = false, action) {
  switch (action.type) {
    case FETCHING:
      return true
    case FETCHING_COMPLETE:
      return false
    default:
      return state
  }
}

function todos (state = [], action) {
  let todoIndex
  switch (action.type) {
    case FETCH_TODOS_COMPLETE:
      return action.todos
    case ADD_TODO_COMPLETE:
      return [
        action.todo,
        ...state
      ]
    case UPDATE_TODO_COMPLETE:
      todoIndex = state.indexOf(todoWithId(state, action.todo.id))
      return [
        ...state.slice(0, todoIndex),
        action.todo,
        ...state.slice(todoIndex + 1)
      ]
    case REMOVE_TODO_COMPLETE:
      todoIndex = state.indexOf(todoWithId(state, action.id))
      return [
        ...state.slice(0, todoIndex),
        ...state.slice(todoIndex + 1)
      ]
    default:
      return state
  }
}

export default combineReducers({
  fetching,
  todos
})
