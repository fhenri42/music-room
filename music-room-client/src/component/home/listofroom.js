import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Card, Button, Switcher, TabButton } from 'nachos-ui'
import { connect } from 'react-redux'
import { addSongRoom, updateRoom, getRoom } from '../../actions/room.js'
// import Playlist from './playlist'
import { Actions } from 'react-native-router-flux'
import { Constants, Location, Permissions } from 'expo'

class ListOfRoom extends Component {

    getRooms = async () => {
      const { dispatch } = this.props
      const { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        dispatch(getRoom({ userId: this.props.user.id }))
      } else {
        const position = await Location.getCurrentPositionAsync({})
        dispatch(getRoom({ userId: this.props.user.id, lat: position.coords.latitude, long: position.coords.longitude }))
      }
    }

    componentWillMount () {
      this.getRooms()
    }

    render () {
      const cardStyle = { margin: 15, width: 280, borderColor: 'orange' }

      return (
        <ScrollView style={{ height: '70%', alignSelf: 'center' }}>
          { this.props.room.rooms && this.props.room.rooms.length !== 0 && (
            this.props.room.rooms.map((p, key) => {
              return (
                <TouchableOpacity key={key} onPress={ () => {
                  Actions.editRoom({ roomId: p._id, userId: this.props.user.id })
                }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListOfRoom)
