import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Card, Button, Switcher, TabButton } from 'nachos-ui'
import { connect } from 'react-redux'
import { addSongRoom, updateRoom, getRoom } from '../../actions/room.js'
// import Playlist from './playlist'
import { Actions } from 'react-native-router-flux'
import ListOfRoom from './listofroom'

class AddTrackedPlaylist extends Component {

  render () {
    return (
      <Button type='success' onPress={() => {
        Actions.newRoom()
      }}>
        add new trackList
      </Button>
    )

  }

}

class MusicTrack extends Component {
// trier dans room.playlists ceux qui sont mmusic Track
// pour chaque music track afficher un composan room
// acceder au composant de downvote et upvote de la room et d'ajout etc
  render () {
    return (
      <View >
        <AddTrackedPlaylist />
        <ListOfRoom user={this.props.user} room={this.props.room} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.toJS(),
    room: state.room.toJS(),
    notife: state.notife.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicTrack)
