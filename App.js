import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'

import Navbar from './src/components/Navbar'
import MainScreen from './src/screens/MainScreen'
import TodoScreen from './src/screens/TodoScreen'

export default function App() {
  const [todos, setTodos] = useState([])
  const [todoId, setTodoId] = useState(null)

  const addTodo = title => {
    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
      },
    ])
  }

  const updateTodo = (id, title) => {
    setTodos(prev =>
      prev.map(item => {
        if (item.id === id) {
          item.title = title
        }
        return item
      })
    )
  }

  const removeTodo = id => {
    const todo = todos.find(item => item.id === id)
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
            setTodoId(null)
            setTodos(prev => prev.filter(todo => todo.id !== id))
          },
        },
      ],
      { cancelable: false }
    )
  }

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  )

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId)
    content = (
      <TodoScreen
        goBack={() => setTodoId(null)}
        onRemove={removeTodo}
        onSave={updateTodo}
        todo={selectedTodo}
      />
    )
  }

  return (
    <View>
      <Navbar title="Todo App!" />
      <View style={styles.container}>{content}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
})
