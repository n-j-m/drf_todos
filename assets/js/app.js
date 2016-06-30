/* eslint-disable jsx-quotes */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './nav'
import Todo from './todo'
import { fetchTodos, addTodo } from './todos-actions'

import './css/main.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.props.dispatch(fetchTodos())
  }

  render () {
    const { todos, dispatch } = this.props
    const todoItems = todos.map((todo, key) => {
      return <Todo key={key} id={key} {...todo} dispatch={dispatch} />
    })
    return (
      <div>
        <Nav />
        <h1>Todos</h1>
        <div className="col-xs-6 col-xs-offset-2">
          <input className="form-control"
            type="text"
            placeholder="New todo"
            onKeyPress={(ev) => this.createTodo(ev)} />
          <ul>
          {todoItems}
          </ul>
        </div>
      </div>
    )
  }

  createTodo (ev) {
    if (ev.key === 'Enter' && ev.target.value.trim()) {
      this.props.dispatch(addTodo(ev.target.value.trim()))
      ev.target.value = ''
    }
  }
}

export default connect((state) => {
  return {
    fetching: state.fetching,
    todos: state.todos
  }
})(App)
