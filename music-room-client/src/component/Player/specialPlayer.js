import React, { Component } from 'react'
import { View } from 'react-native-ui-lib'
import { Slider, H4 } from 'nachos-ui'
import { Icon } from 'react-native-elements'

class Player extends Component {

  render () {

    const { playSong, previousSong, nextSong, changeType, changeLocationType, distanceChange, distance, active, isPlaying } = this.props

    return (
      <View>
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
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <H4>
            {Math.round((distance * 1000))} m
          </H4>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

          <Slider
            minValue={0}
            maxValue={1}
            value={distance}
            onValueChange={distanceChange}
          />
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <H4
            color={active === 0 ? '#f50' : ''}
            onPress={changeLocationType} >
            Location: {active === 0 ? 'Not active' : 'Active'}
          </H4>
          <H4
            onPress={changeType}
          >{this.props.type === 'private' ? 'Private' : 'Public'}</H4>

        </View>
      </View>
    )
  }
}

export default Player
