import React from 'react'
import { View, StyleSheet } from 'react-native'

const AppCard = props => {
  return (
    <View style={{ ...styles.default, ...props.style }}>{props.children}</View>
  )
}

const styles = StyleSheet.create({
  default: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 8, // shadow for android
  },
})

export default AppCard
