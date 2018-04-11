import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Card, Button, Switcher, TabButton } from 'nachos-ui'
import { connect } from 'react-redux'
import { addSongRoom, updateRoom } from '../../actions/room.js'
// import Playlist from './playlist'
import { Actions } from 'react-native-router-flux'


class AddTrackedPlaylist extends Component {

  render () {
    return (
        <Button type='success' onPress={()=>{
          Actions.newRoom()
        }}>
        add new trackList
        </Button>
    )

  }

}

class ListOfRoom extends Component {

  render () {
    const cardStyle = { margin: 15, width: 280, borderColor: 'orange' }

    return (
      <ScrollView style={{ height: '70%', alignSelf: 'center' }}>
        { this.props.room.rooms && this.props.room.rooms.length !== 0 && (
          this.props.room.rooms.map((p, key) => {
            return (
              <TouchableOpacity key={key} onPress={ () => { 
                Actions.editRoom({ roomId: p._id, userId: this.props.user.id }) }}>
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
//trier dans room.playlists ceux qui sont mmusic Track
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
console.log(state)
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
