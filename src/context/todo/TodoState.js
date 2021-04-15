import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'

import ScreenContext from '../screen/screenContext'
import TodoContext from './todoContext'
import todoReducer from './todoReducer'

import Http from '../../http'
import types from '../types'

const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  }
  const [state, dispatch] = useReducer(todoReducer, initialState)
  const { changeScreen } = useContext(ScreenContext)

  const fetchTodos = async () => {
    showLoader()
    clearError()
    try {
      const data = await Http.get(
        'https://rn-todo-app-aceaa-default-rtdb.firebaseio.com/todos.json'
      )

      const todos = data
        ? Object.keys(data).map(key => ({ ...data[key], id: key }))
        : []
      dispatch({ type: types.FETCH_TODOS, payload: todos })
    } catch (error) {
      showError('error')
      console.log(error)
    } finally {
      hideLoader()
    }
  }

  const addTodo = async title => {
    clearError()
    try {
      const data = await Http.post(
        'https://rn-todo-app-aceaa-default-rtdb.firebaseio.com/todos.json',
        { title }
      )

      dispatch({ type: types.ADD_TODO, payload: { title, id: data.name } })
    } catch (error) {
      showError('error')
      console.log(error)
    }
  }

  const updateTodo = async (id, title) => {
    clearError()
    try {
      await Http.patch(
        `https://rn-todo-app-aceaa-default-rtdb.firebaseio.com/todos/${id}.json`,
        { title }
      )
      dispatch({ type: types.UPDATE_TODO, payload: { id, title } })
    } catch (error) {
      showError('error')
      console.log(error)
    }
  }

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
          onPress: async () => {
            await Http.delete(
              `https://rn-todo-app-aceaa-default-rtdb.firebaseio.com/todos/${id}.json`
            )
            changeScreen(null)
            dispatch({ type: types.REMOVE_TODO, payload: id })
          },
        },
      ],
      { cancelable: false }
    )
  }

  const showLoader = () => dispatch({ type: types.SHOW_LOADER })
  const hideLoader = () => dispatch({ type: types.HIDE_LOADER })

  const showError = error =>
    dispatch({ type: types.SHOW_ERROR, payload: error })
  const clearError = () => dispatch({ type: types.CLEAR_ERROR })

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        updateTodo,
        removeTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoState
