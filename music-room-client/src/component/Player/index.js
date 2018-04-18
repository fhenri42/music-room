import React, { Component } from 'react'
import { View } from 'react-native-ui-lib'

import { Icon } from 'react-native-elements'

class Player extends Component {

  render () {

    const { playSong, previousSong, nextSong, isPlaying } = this.props

    return (
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

        <Icon
          raised
          name='skip-previous'
          type='skip-previous'
          color='#f50'
          onPress={previousSong} />
        <Icon
          raised
          name={isPlaying !== true ? 'play-arrow' : 'pause'}
          type={isPlaying !== true ? 'play-arrow' : 'pause'}
          color='#f50'
          onPress={playSong} />
        <Icon
          raised
          name='skip-next'
          type='skip-next'
          color='#f50'
          onPress={nextSong} />

      </View>
    )
  }
}

export default Player
