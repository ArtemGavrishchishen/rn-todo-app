import React, { useState } from 'react'
import { View, StyleSheet, Button } from 'react-native'

import EditModal from '../components/EditModal'
import AppCard from '../components/ui/AppCard'
import AppTextBold from '../components/ui/AppTextBold'
import { THEME } from '../theme'

const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
  const [modal, setModal] = useState(false)

  const saveHandler = title => {
    onSave(todo.id, title)
    setModal(false)
  }
  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onSave={saveHandler}
        onCancel={() => setModal(false)}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}> {todo.title}</AppTextBold>
        <Button title="Update" onPress={() => setModal(true)} />
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Go Back" color={THEME.GREY_COLOR} onPress={goBack} />
        </View>
        <View style={styles.button}>
          <Button
            title="Remove"
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 20,
    padding: 10,
  },
  button: {
    width: '40%',
  },
  title: {
    fontSize: 20,
  },
})

export default TodoScreen
