import types from '../types'

const handlers = {
  [types.CHANGE_SCREEN]: (state, payload) => payload,
  DEFAULT: state => state,
}

const screenReducer = (state, { type, payload }) => {
  const handler = handlers[type] || handlers.DEFAULT

  return handler(state, payload)
}

export default screenReducer
