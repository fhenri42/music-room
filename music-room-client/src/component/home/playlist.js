import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Card, Button, Switcher, TabButton } from 'nachos-ui'
import { Actions } from 'react-native-router-flux'
import { Icon } from 'react-native-elements'

class Playlist extends Component {

  state = {
    playlistId: '',
    typeOf: 'private',
  }

  render () {
    const { typeOf } = this.state
    const { playlist, user } = this.props
    const privateArray = []
    const publicArray = []

    if (playlist && playlist.playlists.length !== 0) {
      playlist.playlists.forEach(e => {
        if (e.type === 'private') { privateArray.push(e) }
        if (e.type === 'public') { publicArray.push(e) }
      })
    }
    const cardStyle = { margin: 15, width: 280, borderColor: 'orange' }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: '10%', width: '100%' }}>
          <Switcher
            style={{ width: '100%' }}
            onChange={valueOne => { this.setState({ typeOf: valueOne }) }}
            defaultSelected={typeOf}
          >
            <TabButton value='private' text='Private' iconName='md-musical-notes'/>
            <TabButton value='public' text='Public' iconName='md-musical-notes' />
          </Switcher>
          {typeOf === 'private' && (
            <View>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                <Text>{'Your private play list:'}</Text>
                <Icon
                  raised
                  name='add'
                  type='add'
                  color='#f50'
                  size={15}
                  onPress={() => { Actions.newplaylist({typePlaylist: 'private'}) }} />
              </View>
              <ScrollView style={{ height: '70%', alignSelf: 'center' }}>
                { privateArray && privateArray.length !== 0 && (
                  privateArray.map((p, key) => {
                    return (
                      <TouchableOpacity key={key} onPress={ () => { Actions.editplaylist({ playlistId: p._id, userId: user.id }) }}>
                        <Card
                          footerContent={p.name}
                          image='https://image.freepik.com/icones-gratuites/itunes-logo-de-la-note-amusical-interieur-d-39-un-cercle_318-50208.jpg'
                          style={cardStyle}
                        />
                      </TouchableOpacity>
                    )
                  })
                )}
              </ScrollView>
            </View>
          )}
          {typeOf === 'public' && (
            <View>

              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <Text>{'Public play list:'}</Text>
                <Icon
                  raised
                  name='add'
                  type='add'
                  color='#f50'
                  size={15}
                  onPress={() => { Actions.newplaylist({typePlaylist: 'public'}) }} />
              </View>
              <ScrollView style={{ height: '70%', alignSelf: 'center' }}>
                { publicArray && publicArray.length !== 0 && (
                  publicArray.map((p, key) => {
                    return (
                      <TouchableOpacity key={key} onPress={ () => { Actions.editplaylist({ playlistId: p._id, userId: user.id }) }}>
                        <Card
                          footerContent={p.name}
                          image='https://image.freepik.com/icones-gratuites/itunes-logo-de-la-note-amusical-interieur-d-39-un-cercle_318-50208.jpg'
                          style={cardStyle}
                        />
                      </TouchableOpacity>
                    )
                  })
                )}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
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

export default Playlist
