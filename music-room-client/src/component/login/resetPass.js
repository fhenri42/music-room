import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { resetPass, verifyNewPassword } from '../../actions/user.js'
import { Input, Button } from 'nachos-ui'
import Toaster from '../toaster/index.js'

class ResetPass extends Component {

  state = {
    code: '',
    email: '',
    newPassword: '',
    isSend: false,
  }
  render () {

    const { code, isSend, email, newPassword } = this.state

    return (
      <View flex paddingH-25 paddingT-120>
        <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
          <Input
            style={{ margin: 15 }}
            placeholder={'email'}
            value={this.state.email}
            onChangeText={value => this.setState({ email: value })}
          />
          <Button onPress={() => {
            this.setState({ isSend: true })
            this.props.dispatch(resetPass(email))
          }}>Send code</Button>
        </View>
        {isSend && (
          <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
            <Input
              style={{ margin: 15 }}
              placeholder={'code'}
              value={this.state.code}
              onChangeText={value => this.setState({ code: value })}
            />
            <Input
              style={{ margin: 15 }}
              placeholder={'New-Password'}
              value={this.state.newPassword}
              onChangeText={value => this.setState({ newPassword: value })}
            />
            <Button onPress={() => { this.setState({ isSend: true }); this.props.dispatch(verifyNewPassword(email, newPassword, code)) }}>Verifie</Button>

          </View>
        )}

        {this.props.notife.message !== '' && (<Toaster msg={this.props.notife.message} />)}

      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    notife: state.notife.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPass)
