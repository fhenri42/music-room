import React, { Component } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Button, Card } from 'nachos-ui'
import { connect } from 'react-redux'
// import Playlist from './playlist'
import { Actions } from 'react-native-router-flux'

class ListOfRoom extends Component {

  render () {
    return (
      <ScrollView style={{ height: '70%', alignSelf: 'center' }}>
        {this.props.room.rooms && this.props.room.rooms.length !== 0 && (
          this.props.room.rooms.map((p, key) => {
            return (
              <TouchableOpacity key={key} onPress={() => { Actions.editRoom({ roomId: p._id, userId: this.props.user.id }) }}>
                <Card
                  footerContent={p.name}
                  image='https://image.freepik.com/icones-gratuites/itunes-logo-de-la-note-amusical-interieur-d-39-un-cercle_318-50208.jpg'
                  style={{ margin: 15, width: 280, borderColor: 'orange' }}
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
