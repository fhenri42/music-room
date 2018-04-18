import React, { Component } from 'react'
import { ActionBar } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native'

class Menu extends Component {

  render () {
    const { playListMode, serviceMode, settingsMode } = this.props

    return (
      <ActionBar
        containerStyle={[styles.absoluteContainer]}
        backgroundColor={'orange'}
        actions={[
          { label: 'Track Vote', onPress: () => serviceMode(), white: true },
          { label: 'Playlist Editor', onPress: () => playListMode(), white: true },
          { label: 'Setings', onPress: () => settingsMode(), white: true },
        ]}
      />
    )
  }

}

const styles = StyleSheet.create({
  absoluteContainer: {
    bottom: 70,
    left: 0,
    right: 0,
  },
})

export default Menu
