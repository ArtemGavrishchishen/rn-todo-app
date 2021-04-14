import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'

import ScreenContext from '../screen/screenContext'
import TodoContext from './todoContext'
import todoReducer from './todoReducer'

import types from '../types'

const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
  }
  const [state, dispatch] = useReducer(todoReducer, initialState)
  const { changeScreen } = useContext(ScreenContext)

  const addTodo = title => dispatch({ type: types.ADD_TODO, payload: title })
  const updateTodo = (id, title) =>
    dispatch({ type: types.UPDATE_TODO, payload: { id, title } })
  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id)
    Alert.alert(
      'Alert Title',
      `My Alert Msg: ${todo.title}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          style: 'destructive',
          onPress: () => {
            changeScreen(null)
            dispatch({ type: types.REMOVE_TODO, payload: id })
          },
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <TodoContext.Provider
      value={{ todos: state.todos, addTodo, updateTodo, removeTodo }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoState
