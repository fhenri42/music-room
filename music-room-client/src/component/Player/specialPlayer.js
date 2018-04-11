import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView, WebView, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Slider, Card, Input, H4, Switcher, TabButton, Button } from 'nachos-ui'
import { connect } from 'react-redux'
import { addSongPlaylist } from '../../actions/playlist.js'
import request from 'superagent'

import { Icon } from 'react-native-elements'

class Player extends Component {

    render() {

        const { playSong, previousSong, nextSong, changeType, changeLocationType, distanceChange, distance, active } = this.props

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
                        name='play-arrow'
                        type='play-arrow'
                        color='#f50'
                        onPress={playSong} />
                    <Icon
                        raised
                        name='skip-next'
                        type='skip-next'
                        color='#f50'
                        onPress={nextSong} />
                    <H4
                        onPress={changeType}
                    >{this.props.type == 0 ? "Private" : "Public"}</H4>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <H4>
                        {distance}km
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
                        color={active == 0 ? '#f50' : ''}
                        onPress={changeLocationType} >
                        Location: {active == 0 ? 'Not active' : 'Active'}
                     </H4>
                    
                </View>
            </View>
        )
    }
}

export default Player
