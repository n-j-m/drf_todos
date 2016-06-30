/* eslint-disable jsx-quotes */
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { updateTodo, removeTodo } from './todos-actions'
import cls from './class-names'

export default class Todo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }

  componentDidMount () {
    const { isEditing } = this.state
    if (isEditing) {
      findDOMNode(this.refs.todoInput).focus()
    }
  }

  componentDidUpdate () {
    const { isEditing } = this.state
    if (isEditing) {
      findDOMNode(this.refs.todoInput).focus()
    }
  }

  render () {
    const todo = this.props
    const { isEditing } = this.state
    const textStyle = {
      'textDecoration': todo.complete ? 'line-through' : 'none',
      'display': isEditing ? 'none' : ''
    }
    const inputStyle = {
      'display': isEditing ? '' : 'none'
    }
    const completeCls = cls({
      'btn': true,
      'btn-default': true,
      'active': todo.complete
    })
    const iconCls = todo.complete ? 'glyphicon glyphicon-ok-sign' : 'glyphicon glyphicon-ok-circle'
    return (
      <li className="todo-item">
        <div style={textStyle}
          onClick={(ev) => {
            this.setState({isEditing: true})
            findDOMNode(this.refs.todoInput).focus()
          }}>
        {todo.text}
        </div>
        <input ref="todoInput"
          style={inputStyle}
          type="text"
          defaultValue={todo.text}
          onBlur={(ev) => this.handleEdit(ev)} />
        <button className={completeCls} title="Toggle Complete"
          onClick={(ev) => this.handleToggle(ev)}>
          <span className={iconCls}></span>
        </button>
        <button className="btn btn-default" title="Remove Todo"
          onClick={(ev) => this.handleRemove(ev)}>
          <span className="glyphicon glyphicon-remove"></span>
        </button>
      </li>
    )
  }

  handleToggle (ev) {
    const { dispatch } = this.props
    if (!this.props.complete) {
      ev.target.classList.add('active')
    }
    dispatch(updateTodo({
      ...this.props,
      complete: !this.props.complete
    }))
  }

  handleRemove (ev) {
    const { dispatch } = this.props
    dispatch(removeTodo(this.props.id))
  }

  handleEdit (ev) {
    const { dispatch } = this.props
    dispatch(updateTodo({
      ...this.props,
      text: ev.target.value
    }))
    this.setState({isEditing: false})
  }
}
