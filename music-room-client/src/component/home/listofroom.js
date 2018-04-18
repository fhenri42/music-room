import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { Button } from 'nachos-ui'
import { connect } from 'react-redux'
// import Playlist from './playlist'
import { Actions } from 'react-native-router-flux'
import { Location, Permissions } from 'expo'

class ListOfRoom extends Component {

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
                  backgroundColor: 'black' }}>{p.name}</Button>
            )
          })
        )}
        <Button kind='squared' onPress={() =>
          Permissions.askAsync(Permissions.LOCATION).then(status => {
            if (status.status === 'granted') {
              Location.getCurrentPositionAsync({}).then(position => {
                Actions.map({ room: this.props.room, lat: position.coords.latitude, long: position.coords.longitude })
              })
            }
          })}> Map</Button>
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
