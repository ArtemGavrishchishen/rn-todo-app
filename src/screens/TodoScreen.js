import React, { useState } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { AntDesign, FontAwesome } from '@expo/vector-icons'

import EditModal from '../components/EditModal'
import AppCard from '../components/ui/AppCard'
import AppTextBold from '../components/ui/AppTextBold'
import AppButton from '../components/ui/AppButton'
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
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton color={THEME.GREY_COLOR} onPress={goBack}>
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
          >
            <FontAwesome name="remove" size={20} color="#fff" />
          </AppButton>
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
