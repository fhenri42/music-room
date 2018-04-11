import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Card, Button, Switcher, TabButton } from 'nachos-ui'
import { connect } from 'react-redux'
import { addSongPlaylist, updatePlaylist } from '../../actions/playlist.js'
// import Playlist from './playlist'
import { Actions } from 'react-native-router-flux'


class AddTrackedPlaylist extends Component {

  render () {
    return (
        <Button type='success' onPress={()=>{console.log('hello')}}>
        add new trackList
        </Button>
    )

  }

}

class ListOfPLaylist extends Component {

  render () {
    const cardStyle = { margin: 15, width: 280, borderColor: 'orange' }

    return (
      <ScrollView style={{ height: '70%', alignSelf: 'center' }}>
        { this.props.playlist.playlists && this.props.playlist.playlists.length !== 0 && (
          this.props.playlist.playlists.map((p, key) => {
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
    )

  }

}

class MusicTrack extends Component {
//trier dans playlist.playlists ceux qui sont mmusic Track
// pour chaque music track afficher un composan playlist
// acceder au composant de downvote et upvote de la playlist et d'ajout etc
  render () {
    return (
      <View >
        <AddTrackedPlaylist />
        <ListOfPLaylist user={this.props.user} playlist={this.props.playlist} />
      </View>
    )
  }
}

const mapStateToProps = state => {

  return {
    state
    // user: state.user.toJS(),
    // playlist: state.playlist.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicTrack)
