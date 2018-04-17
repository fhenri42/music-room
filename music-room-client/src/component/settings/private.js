import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Card, Input, H4, Switcher, TabButton, Button, RadioGroup } from 'nachos-ui'

import { updateUserPrivate } from '../../actions/user.js'
import { facebookLinkAction } from '../../actions/user.js'
import { AuthSession } from 'expo'

import Toaster from '../toaster/index.js'

const FB_APP_ID = '658620540953187'

class Singup extends Component {

  renderTextField = ({ input, label, meta: { touched, error }, ...custom, secureTextEntry }) => (

    <Input
      style={{ margin: 15 }}
      placeholder={label}
      {...input}
      {...custom}
    />)

  renderRadioGroup = ({ input, label, meta: { touched, error }, ...custom }) => (
    <RadioGroup
      style={{ margin: 15 }}
      onChange= {(a, b) => { input.onChange(a, b) }}
      options={['read', 'read&&write']}
    />
  )

  _handlePressAsync = async () => {
    const redirectUrl = AuthSession.getRedirectUrl()
    const result = await AuthSession.startAsync({
      authUrl:
        'https://www.facebook.com/v2.8/dialog/oauth?response_type=token'
        + `&client_id=${FB_APP_ID}`
        + `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    })
    this.props.dispatch(facebookLinkAction(result, this.props.user.id))
  }

  onSubmit = event => { this.props.dispatch(updateUserPrivate(event, this.props.user.id)) }

  render () {

    const { handleSubmit, initialValues, user } = this.props

    console.log(user)
    return (
      <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
        <Field
          label={'Email'}
          name={'email'}
          component={this.renderTextField}
        />
        <Field
          label={'Password'}
          name={'password'}
          component={this.renderTextField}
          secureTextEntry={true}
        />
        <Button kind='squared' onPress={handleSubmit(this.onSubmit)}>Update</Button>
        {!user.isFaceBookLogin && (

          <Button kind='squared' onPress={this._handlePressAsync}>Link facebook account</Button>
        )}

      </View>
    )
  }
}

const validate = values => {
  const errors = {}

  return errors
}

Singup = reduxForm({
  form: 'singupForm',
  validate,
})(Singup)

const mapStateToProps = state => {
  return {
    user: state.user.toJS(),
    notife: state.notife.toJS(),
  }
}
const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Singup)
