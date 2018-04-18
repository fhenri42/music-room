import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Card, Button, Switcher, TabButton } from 'nachos-ui'
import { connect } from 'react-redux'
import { getClassement, updateClassement } from '../../actions/classement.js'

class Classement extends Component {

    updateVote = (vote, songId) => {
        const songs = this.props.classement.songs
        const index = songs.findIndex(e => e.id === songId)
    
        const classementIndex = this.props.user.classement.songs.findIndex(e => e.id === songId)
        if (classementIndex === -1){
            songs[index].vote += 1
            dispatch(updateRoom({ songs }, room.rooms[index1]._id, user.id))
        }
      }

    render(){
        return (
            <View style={{flex: 1}}>
            <ScrollView style={{ height: '60%' }}>
                {this.props.classement.songs.map((s, key) => {
                    return (
                        <View key={key} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: color }}>
                        {(
                          <Icon
                            raised
                            name='keyboard-arrow-up'
                            type='keyboard-arrow-up'
                            color='#f50'
                            size={15}
                            onPress={() => { if (key !== 0) { this.updateVote(1, s.id) } }} />
                        )}
                        {(
                          <Icon
                            raised
                            name='keyboard-arrow-down'
                            type='keyboard-arrow-down'
                            color='#f50'
                            size={15}
                            onPress={() => { if (key < this.props.classement.songs.length - 1) { this.updateVote(-1, s.id) } }} />
                        )}
                        <H4 >Vote {-s.vote}</H4>
                        <Button style={{ backgroundColor: color }} kind='squared' iconName='md-musical-notes' onPress={() => { this.playTrackWrapper(s.id) }}>{s.name}</Button>
                      </View>
                      )
                })}
                </ScrollView>
                </View>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.classement.toJS())
    return {
      classement: state.classement.toJS(),
      user: state.user.toJS()
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return { dispatch }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Classement)
  