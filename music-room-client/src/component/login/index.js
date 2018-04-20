import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { View, TextInput, Button } from 'react-native-ui-lib'
import { Actions } from 'react-native-router-flux'
import { loginUser } from '../../actions/user.js'
import FacebookLogin from './facebookLogin.js'
import Toaster from '../toaster/index.js'
// import { connectDeezer, playTrack, checkSession } from '../../utils/deezerService.js'

class Login extends Component {

  renderTextField = ({ input, label, ...custom, secureTextEntry }) => (
    <TextInput text50 placeholder={label} dark10 {...input} {...custom} secureTextEntry={secureTextEntry}/>
  )

  onSubmit = event => {
    this.props.dispatch(loginUser(event))
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <View flex paddingH-25 paddingT-120>
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
        <Button text70 white background-orange30 onPress={handleSubmit(this.onSubmit)} label='Login' />
        <Button link text70 orange30 marginT-20 onPress={() => { Actions.singup() }} label='Singup' />
        <Button link text70 orange30 marginT-20 onPress={() => { Actions.resetPass() }} label='reset-password' />
        <FacebookLogin />
        {this.props.notife.message !== '' && (<Toaster msg={this.props.notife.message} />)}

      </View>
    )
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = ['email', 'password']

  requiredFields.forEach(field => { if (!values[field]) { errors[field] = 'Required' } })

  return errors
}

Login = reduxForm({
  form: 'loginForm',
  validate,
})(Login)

const mapStateToProps = state => {
  return { notife: state.notife.toJS() }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
