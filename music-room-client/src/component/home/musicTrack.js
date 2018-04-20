import React, { Component } from 'react'
import { View } from 'react-native-ui-lib'
import { Button } from 'nachos-ui'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import ListOfRoom from './listofroom'
import { Icon } from 'react-native-elements'
import { Location, Permissions } from 'expo'

class MusicTrack extends Component {

  render () {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '25%', padding: 10 }}>
          <Icon
            raised
            name='map'
            type='map'
            color='#23242d'
            size={25}
            onPress={() =>
              Permissions.askAsync(Permissions.LOCATION).then(status => {
                if (status.status === 'granted') {
                  Location.getCurrentPositionAsync({}).then(position => {
                    Actions.map({ room: this.props.room, lat: position.coords.latitude, long: position.coords.longitude })
                  })
                }
              })}/>
          <Button kind='squared' style={{ backgroundColor: '#23242d' }} onPress={() => { Actions.newRoom() }}>
        Add new trackList
          </Button>

          <Icon
            raised
            name='star'
            type='star'
            color='#23242d'
            size={25}
            onPress={() => { Actions.classement() }}/>
        </View>
        <View>
          <View style={{ display: 'flex', alignItems: 'center', height: '70%' }}>
            <ListOfRoom />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.toJS(),
    room: state.room.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicTrack)
