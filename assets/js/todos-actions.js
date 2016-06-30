import { createTodo, getTodos, modifyTodo, deleteTodo } from './api'

export const FETCHING = 'FETCHING'
export const FETCHING_COMPLETE = 'FETCHING_COMPLETE'
export const ADD_TODO = 'ADD_TODO'
export const ADD_TODO_COMPLETE = 'ADD_TODO_COMPLETE'
export const UPDATE_TODO = 'UPDATE_TODO'
export const UPDATE_TODO_COMPLETE = 'UPDATE_TODO_COMPLETE'
export const FETCH_TODOS = 'FETCH_TODOS'
export const FETCH_TODOS_COMPLETE = 'FETCH_TODOS_COMPLETE'
export const REMOVE_TODO = 'REMOVE_TODO'
export const REMOVE_TODO_COMPLETE = 'REMOVE_TODO_COMPLETE'
export const ERROR = 'ERROR'

export function error (error) {
  return {
    type: ERROR,
    error
  }
}

export function fetching () {
  return { type: FETCHING }
}

export function fetchingComplete () {
  return { type: FETCHING_COMPLETE }
}

export function addTodo (text) {
  return (dispatch) => {
    dispatch(fetching())
    createTodo(text)
      .then(newTodo => {
        dispatch(fetchingComplete())
        dispatch(addTodoComplete(newTodo))
      })
      .catch(err => dispatch(error(err)))
  }
}

export function addTodoComplete (todo) {
  return {
    type: ADD_TODO_COMPLETE,
    todo
  }
}

export function fetchTodos () {
  return (dispatch) => {
    dispatch(fetching())
    getTodos()
      .then(todos => {
        dispatch(fetchingComplete())
        dispatch(fetchTodosComplete(todos))
      })
  }
}

export function fetchTodosComplete (todos) {
  return {
    type: FETCH_TODOS_COMPLETE,
    todos
  }
}

export function updateTodo (todo) {
  return (dispatch) => {
    dispatch(fetching())
    modifyTodo(todo)
      .then(todo => {
        dispatch(fetchingComplete())
        dispatch(updateTodoComplete(todo))
      })
  }
}

export function updateTodoComplete (todo) {
  return {
    type: UPDATE_TODO_COMPLETE,
    todo
  }
}

export function removeTodo (todoId) {
  return (dispatch) => {
    dispatch(fetching())
    deleteTodo(todoId)
      .then(ok => {
        dispatch(fetchingComplete())
        dispatch(removeTodoComplete(todoId))
      })
  }
}

export function removeTodoComplete (id) {
  return {
    type: REMOVE_TODO_COMPLETE,
    id
  }
}
