import request from 'superagent'

function getCookie (name) {
  let cookieValue = null
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';')
    for (let i = 0, l = cookies.length; i < l; i++) {
      let cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

function createOptions (overrides) {
  const headers = createHeaders()
  const options =  {
    credentials: 'same-origin',
    headers
  }

  if (overrides && typeof overrides === 'object') {
    return Object.assign({}, options, overrides)
  }
  return options
}

function createHeaders () {
  return {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
  }
}

function makeRequest (options) {
  const { url, headers } = options
  let method = options.method && options.method.toLowerCase() || 'get'
  if (method === 'delete') {
    method = 'del'
  }
  const body = options['body'] || null
  const req = request[method]
  if (!req) {
    throw new TypeError(`request.${method} not found`)
  }

  return new Promise((resolve, reject) => {
    req(url)
      .set(headers)
      .send(body)
      .end((err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
  })
}

export function modifyTodo (todo) {
  return makeRequest(createOptions({
    url: `/api/todos/${todo.id}/`,
    method: 'PUT',
    body: todo
  })).then(res => res.body)
}

export function deleteTodo (todoId) {
  return makeRequest(createOptions({
    url: `/api/todos/${todoId}/`,
    method: 'DELETE'
  }))
}

export function getTodos () {
  return makeRequest(createOptions({
    url: '/api/todos/'
  })).then(res => res.body.results)
}

export function createTodo (text) {
  return makeRequest(createOptions({
    url: '/api/todos/',
    method: 'POST',
    body: { text }
  })).then(res => res.body)
}
