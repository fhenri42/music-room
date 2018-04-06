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

class Home extends Component {

  componentWillMount () {
    Expo.SecureStore.getItemAsync('token', {}).then(token => {
      return this.props.dispatch({
        type: 'client/verifeUser',
        data: token,
      })
    })
  }
  state = {
    mode: this.props.mode || 0,
  }

  serviceMode = () => { this.setState({ mode: 0 }) }
  playListMode = () => { this.setState({ mode: 1 }); this.props.dispatch(getPlayList(this.props.user.id)) }
  settingsMode= () => { this.setState({ mode: 2 }) }
  render () {

    const { handleSubmit, user, playlist } = this.props
    const { mode } = this.state
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

        {mode === 0 && (
          <Text>{mode}</Text>
        )}
        {mode === 1 && (
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
