import types from '../types'

const handlers = {
  [types.ADD_TODO]: (state, payload) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id: Date.now().toString(),
        title: payload,
      },
    ],
  }),
  [types.UPDATE_TODO]: (state, payload) => ({
    ...state,
    todos: state.todos.map(todo => {
      if (todo.id === payload.id) {
        todo.title = payload.title
      }
      return todo
    }),
  }),
  [types.REMOVE_TODO]: (state, payload) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== payload),
  }),
  DEFAULT: state => state,
}

const todoReducer = (state, { type, payload }) => {
  const handler = handlers[type] || handlers.DEFAULT

  return handler(state, payload)
}

export default todoReducer
