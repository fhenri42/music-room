import React, { Component } from 'react'
import { View } from 'react-native-ui-lib'
import { Button } from 'nachos-ui'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import ListOfRoom from './listofroom'
import { Icon } from 'react-native-elements'

class MusicTrack extends Component {

  render () {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '25%', padding: 10 }}>
          <Button kind='squared' style={{ backgroundColor: '#23242d' }} onPress={() => { Actions.newRoom() }}>
        Add new trackList
          </Button>

          <Icon
            raised
            name='star'
            type='star'
            color='#23242d'
            size={15}
            onPress={() => { Actions.classement() }}/>
        </View>
        <View>
          <View style={{ display: 'flex', alignItems: 'center', height: '70%' }}>
            <ListOfRoom user={this.props.user} room={this.props.room} />
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
