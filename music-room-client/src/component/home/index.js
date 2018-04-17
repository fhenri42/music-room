import React, { Component } from 'react'
import { View, TextInput, Text, Button } from 'react-native-ui-lib'
import { connect } from 'react-redux'
import { WebView, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Menu from './menu.js'
import Playlist from './playlist.js'
import { getPlayList } from '../../actions/playlist.js'
import { toJS } from 'immutable'
import Settings from '../settings/index.js'
import Toaster from '../toaster/index.js'
import MusicTrack from './musicTrack.js'
import { checkSession } from '../../utils/deezerService.js'
import { Constants, Location, Permissions } from 'expo'
import { getRoom } from '../../actions/room.js'


class Home extends Component {


  state = {
    mode: this.props.mode || 0,
    disab: false,
  }

  componentWillMount() {
    const { dispatch } = this.props
    Permissions.askAsync(Permissions.LOCATION).then(status => {
      if (status.status !== 'granted') {
        dispatch(getRoom({ userId: this.props.user.id }))
      } else {
        Location.getCurrentPositionAsync({}).then(position => {
          dispatch(getRoom({ userId: this.props.user.id, lat: position.coords.latitude, long: position.coords.longitude }))
        })

      }
    })
  }
  componentWillReceiveProps (nextProps) {
    checkSession(((e) => {
      if (e === false) {
        this.setState({ mode: 2 })
      }
      this.setState({ disab: e })
    }))
  }

  serviceMode = () => {
    this.setState({ mode: 0 })
    const { dispatch } = this.props
    Permissions.askAsync(Permissions.LOCATION).then(status => {
      if (status.status !== 'granted') {
        dispatch(getRoom({ userId: this.props.user.id }))
      } else {
        Location.getCurrentPositionAsync({}).then(position => {
          dispatch(getRoom({ userId: this.props.user.id, lat: position.coords.latitude, long: position.coords.longitude }))
        })

      }
    })
  }

  playListMode = () => { this.setState({ mode: 1 }); this.props.dispatch(getPlayList(this.props.user.id)) }
  settingsMode= () => { this.setState({ mode: 2 }) }
  render () {

    const { handleSubmit, user, playlist } = this.props
    const { mode, disab } = this.state
    return (

      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {mode === 0 && disab && (
        <MusicTrack user={user} playlist={playlist} />
      )}
      {mode === 1 && disab && (
        <Playlist playlist={playlist} user={user}/>
      )}
      {mode === 2 && (

        <Settings />
      )}
      <Menu playListMode={this.playListMode} settingsMode={this.settingsMode} serviceMode={this.serviceMode} />
      {this.props.notife.message !== '' && (<Toaster msg={this.props.notife.message} />)}
      </View>

    )
  }
}

const mapStateToProps = state => {

  return {
    user: state.user.toJS(),
    playlist: state.playlist.toJS(),
    notife: state.notife.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
