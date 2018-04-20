import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { View } from 'react-native-ui-lib'
import { H2 } from 'nachos-ui'

import Private from './private.js'
import Public from './public.js'
import DeezerLogin from './deezerLogin.js'
import FacebookLogin from '../login/facebookLogin.js'
import { callApi } from '../../utils/callApi'
import jwtDecode from 'jwt-decode'

class ShowProfile extends Component {

  componentDidMount () {
    callApi(`user/${this.props.email}`, 'get').then(body => {
      const user = jwtDecode(body.token)
      const index = user.friends.findIndex(e => e === this.props.myEmail)
      let isFriend = false
      if (index !== -1 || user.isPrivateInfo) { isFriend = true }
      this.setState({ user, isFriend })
    })
  }
  state = {
    user: {},
    isFriend: false,
  }

  render () {
    const { user, isFriend } = this.state
    return (
      <View style={{ height: '90%', width: '100%' }}>
        {!!user && isFriend ? (
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginTop: 50 }}>
            <H2>{`Name: ${user.firstName}`}</H2>
            <H2>{`Last Name: ${user.lastName}`}</H2>
            <H2>{`Email: ${user.email}`}</H2>
            <H2>{`MusicTag: ${user.musicTags}`}</H2>
          </View>
        ) : <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginTop: 50 }}>
          <H2>{'This user is not ready to share is private information'}</H2>
        </View>}

      </View>

    )
  }
}

export default ShowProfile
