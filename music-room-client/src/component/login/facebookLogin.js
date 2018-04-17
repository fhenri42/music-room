import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AuthSession } from 'expo'
import { connect } from 'react-redux'

import { Button } from 'react-native-ui-lib'
import { facebookLoginAction } from '../../actions/user.js'

const FB_APP_ID = '658620540953187'

class FacebookLogin extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Button text70 white blue30 label={'Facebook'} onPress={this._handlePressAsync} />
      </View>
    )
  }

  _handlePressAsync = async () => {
    const redirectUrl = AuthSession.getRedirectUrl()
    const result = await AuthSession.startAsync({
      authUrl:
        'https://www.facebook.com/v2.8/dialog/oauth?response_type=token'
        + `&client_id=${FB_APP_ID}`
        + `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    })
    this.props.dispatch(facebookLoginAction(result))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = state => {
  return {
    user: state.user.toJS(),
    playlist: state.playlist.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookLogin)
