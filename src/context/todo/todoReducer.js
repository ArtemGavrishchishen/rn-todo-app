import types from '../types'

const handlers = {
  [types.ADD_TODO]: (state, payload) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id: payload.id,
        title: payload.title,
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
  [types.FETCH_TODOS]: (state, payload) => ({ ...state, todos: payload }),
  [types.SHOW_LOADER]: state => ({ ...state, loading: true }),
  [types.HIDE_LOADER]: state => ({ ...state, loading: false }),
  [types.SHOW_ERROR]: (state, payload) => ({ ...state, error: payload }),
  [types.CLEAR_ERROR]: state => ({ ...state, error: null }),
  DEFAULT: state => state,
}

const todoReducer = (state, { type, payload }) => {
  const handler = handlers[type] || handlers.DEFAULT

  return handler(state, payload)
}

export default todoReducer
