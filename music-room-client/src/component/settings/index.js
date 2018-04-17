import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { View, TextInput, Text, Button } from 'react-native-ui-lib'

import Private from './private.js'
import Public from './public.js'
import DeezerLogin from './deezerLogin.js'
import FacebookLogin from '../login/facebookLogin.js'

class Settings extends Component {

  render () {
    return (
      <View style={{ height: '90%', width: '100%' }}>
        <ScrollView style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}>
          <Text style={{ marginBottom: 20 }}>{'Publique information'}</Text>
          <Public />
          <Text style={{ marginTop: 20, marginBottom: 20 }}>{'Private information'}</Text>
          <Private />
          <DeezerLogin />
        </ScrollView>
      </View>

    )
  }
}

export default Settings
