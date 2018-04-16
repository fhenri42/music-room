import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AuthSession } from 'expo'
import { Actions } from 'react-native-router-flux'
import { connectDeezer } from '../../utils/deezerService.js'

import { Button } from 'nachos-ui'

// TODO A FINNIR

export default class DeezerLogin extends React.Component {
  state = {
    result: null,
  };

  render () {
    return (
      <View style={styles.container}>
        <Button kind='squared' onPress={() => { connectDeezer().then() }}>{'Deezer'}</Button>
        <Button kind='squared' onPress={() => {
          Expo.SecureStore.deleteItemAsync('token', {}).then(() => {
            Actions.login()
          })
        }}>Log-out</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
})
