import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Card, Button, Switcher, TabButton } from 'nachos-ui'
import { connect } from 'react-redux'
import { addSongRoom, updateRoom, getRoom } from '../../actions/room.js'
// import Playlist from './playlist'
import { Actions } from 'react-native-router-flux'
import { Constants, Location, Permissions, LinearGradient } from 'expo'

class ListOfRoom extends Component {


  componentWillMount () {
    this.getRooms()
    Permissions.askAsync(Permissions.LOCATION).then( status => {
    Location.getCurrentPositionAsync({}).then(position => {
      this.setState({lat: position.coords.latitude, long: position.coords.longitude})

    })
})
  }

  state = {
    lat: 0,
    long: 0,
  }
  getRooms = async () => {
    const { dispatch } = this.props
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      dispatch(getRoom({ userId: this.props.user.id }))
    } else {
      const position = await Location.getCurrentPositionAsync({})
      dispatch(getRoom({ userId: this.props.user.id, lat: position.coords.latitude, long: position.coords.longitude }))
    }
  }



  render () {
    return (
      <ScrollView style={{ height: '70%', alignSelf: 'center' }}>
        {this.props.room.rooms && this.props.room.rooms.length !== 0 && (
          this.props.room.rooms.map((p, key) => {
            return (
              <Button key={key} onPress={() => { Actions.editRoom({ roomId: p._id, userId: this.props.user.id }) }}
              kind='squared'
              style={{ margin: 15,
                width: 280,
                borderColor: 'orange',
                backgroundColor: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})` }}>{p.name}</Button>
            )
          })
        )}
        <Button  kind='squared' onPress={() => Actions.map({room:this.props.room, lat: this.state.lat, long: this.state.long})}> Map</Button>
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
