import React, { Component } from 'react'
import { View } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Input, Button, RadioGroup } from 'nachos-ui'

import { updateUserPrivate, facebookLinkAction } from '../../actions/user.js'
import { AuthSession } from 'expo'

const FB_APP_ID = '658620540953187'

class Singup extends Component {

  renderTextField = ({ input, label, ...custom }) => (

    <Input
      style={{ margin: 15 }}
      placeholder={label}
      {...input}
      {...custom}
    />)

  renderRadioGroup = () => (
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

const validate = () => {
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
