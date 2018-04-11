import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView, WebView, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Card, Input, H4, Switcher, TabButton, Button } from 'nachos-ui'
import { connect } from 'react-redux'
import { addSongRoom, updateRoom } from '../../actions/room.js'
import request from 'superagent'
import Player from '../Player/specialPlayer'
import AddUser from './addroomuser.js'
import { Icon } from 'react-native-elements'
import Toaster from '../toaster/index.js'
import { playTrack, pause, play } from '../../utils/deezerService.js'


class Room extends Component {

  state = {
    value: '',
    info: [],
    typeOf: 'play',
    currentList: [],
    uri: '',
    isPlaying: false,
    currentSong: '',
  }


  componentDidMount(props){
    this.playTrackWrapper(0);
    console.log("hey la famille ")
}

playTrackWrapper = (id) => {
  const { isPlaying } = this.state
  if (isPlaying) { playTrack(id).then((e) => { playTrack(id).then((e) => { this.setState({ isPlaying: true, currentSong: id }) }) }) } else { playTrack(id.toString()).then((e) => { this.setState({ isPlaying: true, currentSong: id }) }) }
}
  callDezzerapi = (value) => {
    this.setState({ value })
    request.get(`https://api.deezer.com/search?q=${value}`)
      .set('Accept', 'application/json')
      .then((res) => {
        this.setState({ info: res.body.data })
      })
  }
  pausePlay = () => {
    const { isPlaying, currentSong } = this.state
    const { room } = this.props
    if (!currentSong) {
      const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)
      const song = room.rooms[index1].songs[0]
      this.playTrackWrapper(song.id)
    } else if (!isPlaying) { this.setState({ isPlaying: !isPlaying }); play() } else { this.setState({ isPlaying: !isPlaying }); pause() }
  }

  nextSong = () => {

    const { currentSong } = this.state
    const { room } = this.props

    const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)

    const songs = room.rooms[index1].songs

    let index = songs.findIndex(e => e.id === currentSong)
    index += 1
    if (index >= songs.length) { index = 0 }
    this.playTrackWrapper(songs[index].id)

  }

  previousSong = () => {
    const { currentSong } = this.state
    const { room } = this.props
    const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)

    const songs = room.rooms[index1].songs
    let index = songs.findIndex(e => e.id === currentSong)

    index -= 1
    if (index < 0) { index = 0 }

    this.playTrackWrapper(songs[index].id)

  }

  changeLocationType = () =>{
    const { room, dispatch, user } = this.props
    const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)
  
    if (room.rooms[index1].users.findIndex(u => u.id === user.id) > -1){
      room.rooms[index1].location.active ^=1
      if (room.rooms[index1].location.active == 1){
        navigator.geolocation.getCurrentPosition((position)=>{
            room.rooms[index1].location.center = {lat: position.latitude, long: position.longitude}
            dispatch(updateRoom(room.rooms[index1], room.rooms[index1]._id, user.id))
        }, {enableHighAccuracy: true})
      }else{
        dispatch(updateRoom(room.rooms[index1], room.rooms[index1]._id, user.id))
      }
    }
  }


  distanceChange = (distance) =>{
    const { room, dispatch, user } = this.props
    const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)
  
    if (room.rooms[index1].users.findIndex(u => u.id === user.id) > -1){
      room.rooms[index1].location.distance = distance
        dispatch(updateRoom(room.rooms[index1], room.rooms[index1]._id, user.id))
    }
  }


changeType = (status) => {
  const { room, dispatch, user } = this.props
  const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)

  if (room.rooms[index1].users.findIndex(u => u.id === user.id) > -1){
    room.rooms[index1].type ^=1
      dispatch(updateRoom(room.rooms[index1], room.rooms[index1]._id, user.id))
  }
}

distanceOfCenter = (vote, songId) => {
  const { room, dispatch, user } = this.props
  const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)
  const center = room.rooms[index1].location.center
  const distance = room.rooms[index1].location.distance

  navigator.geolocation.getCurrentPosition((position)=>{
    //mettre ca aussi pour changer la position center 
    if ((Math.sqrt(Math.pow(position.longitude - center.long, 2) +  Math.pow(position.latitude - center.lat, 2)) / 1000) <=  distance){
      const songs = room.rooms[index1].songs
      const index = songs.findIndex(e => e.id == songId)
      songs[index].vote +=((vote > 0) ? -1 : 1)
      dispatch(updateRoom({ songs }, room.rooms[index1]._id, user.id))
    }
  }, {enableHighAccuracy: true})
}
  updateVote = (vote, songId) => {

    const { room, dispatch, user } = this.props
    const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)

    const songs = room.rooms[index1].songs
    const index = songs.findIndex(e => e.id == songId)

    this.distanceOfCenter() == 1
    
    
    if ((room.rooms[index1].users.findIndex(u => u.id === user.id) > -1) || room.rooms[index1].type != 0){
        songs[index].vote +=((vote > 0) ? -1 : 1)
        dispatch(updateRoom({ songs }, room.rooms[index1]._id, user.id))
    }else{
      this.distanceOfCenter()
    }
  }

  render () {
    const inputStyle = { margin: 15 }
    const cardStyle = { width: 200 }

    const { info, value, typeOf, currentList, uri, currentSong } = this.state
    const { room, user } = this.props
    const index = room.rooms.findIndex(e => e._id === this.props.roomId)
    const indexUser = room.rooms[index].users.findIndex(u => u.id === user.id)
    return (
      <View style={{ flex: 1 }}>
        {room.rooms[index].users[indexUser].role === 'RW' && (
          <Switcher
            onChange={valueOne => { this.setState({ typeOf: valueOne }) }}
            defaultSelected={typeOf}
          >
            <TabButton value='play' text='Play' iconName='md-musical-notes'/>
            <TabButton value='add' text='add Song' iconName='md-add' />
            <TabButton value='addUser' text='add an user' iconName='md-person-add' />
          </Switcher>)}
        {typeOf === 'play' && (
          <View style={{ flex: 1 }}>
            <ScrollView style={{ height: '60%' }}>
              { !!room && !!room.rooms && room.rooms[index].songs !== 0 && (
                room.rooms[index].songs.map((s, key) => {
                  return (
                    <View key={key} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      {room.rooms[index].users[indexUser].role === 'RW' && (
                        <Icon
                          raised
                          name='keyboard-arrow-up'
                          type='keyboard-arrow-up'
                          color='#f50'
                          size={15}
                          onPress={() => { if (key !== 0) { this.updateVote(1, s.id) } }} />
                      )}
                      {room.rooms[index].users[indexUser].role === 'RW' && (
                        <Icon
                          raised
                          name='keyboard-arrow-down'
                          type='keyboard-arrow-down'
                          color='#f50'
                          size={15}
                          onPress={() => { if (key < room.rooms[index].songs.length - 1) { this.updateVote(-1, s.id) } }} />
                      )}
                      <H4 >Vote {-s.vote}</H4>
                      <Button kind='squared' iconName='md-musical-notes' onPress={() => { this.playTrackWrapper(s.id) }}>{s.name}</Button>
                    </View>)
                })
              )}
            </ScrollView >
            <Player distanceChange={this.distanceChange} distance={room.rooms[index].location.distance} active={room.rooms[index].location.active} changeLocationType={this.changeLocationType} type={room.rooms[index].type} changeType={this.changeType} previousSong={this.previousSong} nextSong={this.nextSong} playSong={() => { this.pausePlay() }} />
          </View>
        )}

        {typeOf === 'add' && (
          <View>
            <Input
              style={inputStyle}
              placeholder='Find a song'
              value={this.state.value}
              onChangeText={(value) => { this.callDezzerapi(value) }}
            />

            <ScrollView>
              {!!info && info.length !== 0 && (
                info.map((e, key) => {
                  return (
                    <View key={key} style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Card
                        footerContent={e.title}
                        image={e.album.cover_big}
                        style={cardStyle}
                      />
                      <Button onPress={() => { this.props.dispatch(addSongRoom(e.id, this.props.roomId, this.props.userId, e.title)) }}>{'Add Song'}</Button>
                    </View>
                  )
                })
              )}

            </ScrollView>

          </View>
        )}

        {typeOf === 'addUser' && (<AddUser plId={this.props.roomId} userId={user.id} users={ room.rooms[index].users} />)}
        {this.props.notife.message !== '' && (<Toaster msg={this.props.notife.message} />)}

      </View>
    )
  }
}

const mapStateToProps = state => {

  return {
    room: state.room.toJS(),
    user: state.user.toJS(),
    notife: state.notife.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(Room)
