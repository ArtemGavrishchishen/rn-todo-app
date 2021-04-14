import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'

import Navbar from './components/Navbar'
import MainScreen from './screens/MainScreen'
import TodoScreen from './screens/TodoScreen'
import ScreenContext from './context/screen/screenContext'

import { THEME } from './theme'

const MainLayout = () => {
  const { todoId } = useContext(ScreenContext)

  return (
    <View>
      <Navbar title="Todo App!" />
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
})

export default MainLayout
