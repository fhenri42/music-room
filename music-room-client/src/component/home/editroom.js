import React, { Component } from 'react'
import { View, TextInput, Text, ActionBar } from 'react-native-ui-lib'
import { StyleSheet, ScrollView, WebView, Dimensions, Platform } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Card, Input, H4, Switcher, TabButton, Button } from 'nachos-ui'
import { connect } from 'react-redux'
import { addSongRoom, updateRoom } from '../../actions/room.js'
import request from 'superagent'
import Player from '../Player/specialPlayer'
import AddUser from './addroomuser.js'
import { Icon } from 'react-native-elements'
import Toaster from '../toaster/index.js'
import { playTrack, pause, play, isPlayingDeezer } from '../../utils/deezerService.js'
import { Constants, Location, Permissions, che } from 'expo'
import { callApi } from '../../utils/callApi.js'

class Room extends Component {

  state = {
    value: '',
    info: [],
    typeOf: 'play',
    currentList: [],
    uri: '',
    isPlaying: false,
    currentSong: '',
    errorMessage: null,
    location: null,
    listOfColor: [],
    duration: 0,
    next: 0,
    interval: 0
  }

  componentWillUnmount (){
    clearInterval(this.state.interval);
  }

  componentDidMount () {
    console.log("ROOM : componentDidMount")
    const listOfColor = []
    const { room } = this.props
    const index = room.rooms.findIndex(e => e._id === this.props.roomId)
    if (room.rooms && index !== -1 && room.rooms[index].songs && room.rooms[index].songs[0]){
      this.playTrackWrapper(room.rooms[index].songs[0].id)
    }
    this.afterSong()
    for (let i = 0; i < 1000; i++) { listOfColor.push(`rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`) }
    this.setState({ listOfColor })
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.props.notife.message = 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
    } else {
      // this._getLocationAsync();
    }
  }

  incrementation = () => {

    const { duration, next, currentSong, isPlaying } = this.state

    isPlayingDeezer((tmpPlayer) => {

      if (isPlaying) {
        console.log('next =>', next)
        this.setState({ next: next + 1 })
        if (next === duration) {
          callApi(`room/all/${this.props.userId}/${this.props.user.lat}/${this.props.user.long}`, 'get').then(body => {

            const index1 = body.rooms.findIndex(e => e._id === this.props.roomId)
            const songs = body.rooms[index1].songs
            let index = songs.findIndex(e => e.id === currentSong)
            index += 1
            if (index >= songs.length) { index = 0 }
            this.playTrackWrapper(songs[index].id)
          })

        }
        if ((next === 30 || next === 31) && !tmpPlayer) {
          callApi(`room/all/${this.props.userId}/${this.props.user.lat}/${this.props.user.long}`, 'get').then(body => {
            const index1 = body.rooms.findIndex(e => e._id === this.props.roomId)
            const songs = body.rooms[index1].songs
            let index = songs.findIndex(e => e.id === currentSong)
            index += 1
            if (index >= songs.length) { index = 0 }
            this.playTrackWrapper(songs[index].id)
          })
        }
      }
    })

  }
  afterSong = () => {
    console.log("Room : afterSong")        
    const interval = setInterval((() => {
      this.incrementation()
    }), 1000)
    this.setState({interval})
  }

playTrackWrapper = (id) => {
  console.log("Room : playTrackWrapper")        
  
  const { isPlaying } = this.state
  if (isPlaying) { playTrack(id).then((e) => { playTrack(id).then((e) => { this.setState({ isPlaying: true, currentSong: id }) }) }) } else { playTrack(id.toString()).then((e) => { this.setState({ isPlaying: true, currentSong: id }) }) }

  request.get(`https://api.deezer.com/track/${id}`)
    .set('Accept', 'application/json')
    .then((res) => {
      this.setState({ duration: res.body.duration })
    })

}
  callDezzerapi = (value) => {
  console.log("Room : callDezzerapi")
  
    this.setState({ value })
    request.get(`https://api.deezer.com/search?q=${value}`)
      .set('Accept', 'application/json')
      .then((res) => {
        this.setState({ info: res.body.data })
      })
  }
  pausePlay = () => {
  console.log("Room : pausePlay")
  
    const { isPlaying, currentSong } = this.state
    const { room } = this.props
    if (!currentSong) {
      const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)
      const song = room.rooms[index1].songs[0]
      if (room.rooms[index1] && room.rooms[index1].songs && room.rooms[index1].songs[0])
        this.playTrackWrapper(song.id)
    } else if (!isPlaying) { this.setState({ isPlaying: !isPlaying }); play() } else { this.setState({ isPlaying: !isPlaying }); pause() }
  }

  nextSong = () => {
    console.log("Room : nextSong")
    
    const { currentSong } = this.state
    const { room } = this.props

    const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)

    const songs = room.rooms[index1].songs

    let index = songs.findIndex(e => e.id === currentSong)
    index += 1
    if (index >= songs.length) { index = 0 }
    if (room.rooms[index1] && room.rooms[index1].songs && room.rooms[index1].songs[0]){
      this.playTrackWrapper(songs[index].id)
    }
  }

  previousSong = () => {
    console.log("Room : previousSong")
    
    const { currentSong } = this.state
    const { room } = this.props
    const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)

    const songs = room.rooms[index1].songs
    let index = songs.findIndex(e => e.id === currentSong)

    index -= 1
    if (index < 0) { index = 0 }
    if (room.rooms[index1] && room.rooms[index1].songs && room.rooms[index1].songs[0]){
      this.playTrackWrapper(songs[index].id)
    }
  }

  changeLocationType = async () => {
    console.log("Room : changeLocationType")
    
    const { room, dispatch, user } = this.props
    const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)
    const indexUser = room.rooms[index1].users.findIndex(u => u.id === user.id)

    if (indexUser === 0) {
      room.rooms[index1].location.active ^= 1
      if (room.rooms[index1].location.active === 1) {
        const { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status !== 'granted') {
          this.props.notife.message = 'Permission to access location was denied'
        }
        const position = await Location.getCurrentPositionAsync({})
        room.rooms[index1].location.center = { lat: position.coords.latitude, long: position.coords.longitude }
        dispatch(updateRoom(room.rooms[index1], room.rooms[index1]._id, user.id))
      } else {
        dispatch(updateRoom(room.rooms[index1], room.rooms[index1]._id, user.id))
      }

    } else {
      this.props.notife.message = 'you\'re not the creator of this room so you cannot make this action.'
    }
  }

  distanceChange = (distance) => {
    console.log("Room : distanceChange")
    
    const { room, dispatch, user } = this.props
    const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)
    const indexUser = room.rooms[index1].users.findIndex(u => u.id === user.id)

    if (indexUser === 0) {

      room.rooms[index1].location.distance = distance
      dispatch(updateRoom(room.rooms[index1], room.rooms[index1]._id, user.id))
    } else {
      this.props.notife.message = 'you\'re not the creator of this room so you cannot make this action.'
    }
  }

changeType = (status) => {
    console.log("Room : changeType")
  
  const { room, dispatch, user } = this.props
  const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)
  const indexUser = room.rooms[index1].users.findIndex(u => u.id === user.id)

  if (indexUser === 0) {

    room.rooms[index1].type = room.rooms[index1].type === 'private' ? 'public' : 'private'
    dispatch(updateRoom(room.rooms[index1], room.rooms[index1]._id, user.id))
  } else {
    this.props.notife.message = 'you\'re not the creator of this room so you cannot make this action.'
  }
}

getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1) // deg2rad below
  const dLon = deg2rad(lon2 - lon1)
  const a
    = (Math.sin(dLat / 2) * Math.sin(dLat / 2))
    + ((Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)))
    * (Math.sin(dLon / 2) * Math.sin(dLon / 2)))

  const c = 2 * (Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
  const d = R * c // Distance in km
  return d
}

deg2rad = (deg) => {
  return deg * (Math.PI / 180)
}

distanceOfCenter = async (vote, songId) => {
    console.log("Room : distanceOfCenter")
  
  const { room, dispatch, user } = this.props
  const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)
  const center = room.rooms[index1].location.center
  const distance = room.rooms[index1].location.distance
  const indexUser = room.rooms[index].users.findIndex(u => u.id === user.id)

  if (indexUser === 0) {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.props.notife.message = 'Permission to access location was denied'
    }

    const position = await Location.getCurrentPositionAsync({})

    if (this.getDistanceFromLatLonInKm(center.lat, center.long, position.coords.latitude, position.coords.longitude) <= distance) {
      const songs = room.rooms[index1].songs
      const index = songs.findIndex(e => e.id === songId)
      songs[index].vote += ((vote > 0) ? -1 : 1)
      dispatch(updateRoom({ songs }, room.rooms[index1]._id, user.id))
    }
  } else {
    this.props.notife.message = 'you\'re not the creator of this room so you cannot make this action.'
  }
}
  updateVote = (vote, songId) => {
    console.log("Room : updateVote")
    

    const { room, dispatch, user } = this.props
    const index1 = room.rooms.findIndex(e => e._id === this.props.roomId)

    const songs = room.rooms[index1].songs
    const index = songs.findIndex(e => e.id === songId)

    songs[index].vote += ((vote > 0) ? -1 : 1)
    dispatch(updateRoom({ songs }, room.rooms[index1]._id, user.id))
  }

  render () {
    const inputStyle = { margin: 15 }
    const cardStyle = { width: 200 }

    const { info, value, typeOf, currentList, uri, currentSong } = this.state
    const { room, user } = this.props
    const index = room.rooms.findIndex(e => e._id === this.props.roomId)
    const indexUser = room.rooms[index].users.findIndex(u => u.id === user.id)
    let superU = false
    if (room.rooms[index].users[0].email === user.email) { superU = true }
    return (
      <View style={{ flex: 1, backgroundColor: '#1e1438' }}>
        {(
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
                  const color = this.state.listOfColor[key % 1000]
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
                          onPress={() => { if (key < room.rooms[index].songs.length - 1) { this.updateVote(-1, s.id) } }} />
                      )}
                      <H4 >Vote {-s.vote}</H4>
                      <Button style={{ backgroundColor: color }} kind='squared' iconName='md-musical-notes' onPress={() => { this.playTrackWrapper(s.id) }}>{s.name}</Button>
                    </View>)
                })
              )}
            </ScrollView >
            <Player distanceChange={this.distanceChange} distance={room.rooms[index].location.distance} isPlaying={this.state.isPlaying} active={room.rooms[index].location.active} changeLocationType={this.changeLocationType} type={room.rooms[index].type} changeType={this.changeType} previousSong={this.previousSong} nextSong={this.nextSong} playSong={() => { this.pausePlay() }} />
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
                      <Button style={{ backgroundColor: this.state.listOfColor[key % 1000] }} onPress={() => { this.props.dispatch(addSongRoom(e.id, this.props.roomId, this.props.userId, e.title)) }}>{'Add Song'}</Button>
                    </View>
                  )
                })
              )}

            </ScrollView>

          </View>
        )}

        {typeOf === 'addUser' && superU === true && (<AddUser plId={this.props.roomId} userId={user.id} users={ room.rooms[index].users} />)}
        { typeOf === 'addUser' && superU !== true && (<Text style={{ textAlign: 'center' }}>your not allowed to add users</Text>)}

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
