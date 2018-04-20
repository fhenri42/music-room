import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { View, TextInput, Button } from 'react-native-ui-lib'
import { Actions } from 'react-native-router-flux'
import { singupUser } from '../../actions/user.js'
import Toaster from '../toaster/index.js'
class Singup extends Component {

  renderTextField = ({ input, label, ...custom, secureTextEntry }) => (
    <TextInput text50 placeholder={label} dark10 {...input} {...custom} secureTextEntry={secureTextEntry}/>
  )

  onSubmit = event => {

    this.props.dispatch(singupUser(event))
  }

  render () {

    const { handleSubmit } = this.props

    return (
      <View flex paddingH-25 paddingT-120>
        <Field
          label={'First Name'}
          name={'firstName'}
          component={this.renderTextField}
        />
        <Field
          label={'Last Name'}
          name={'lastName'}
          component={this.renderTextField}
        />
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
        <Button text70 white background-orange30 onPress={handleSubmit(this.onSubmit)} label='Singup' />
        <Button link text70 orange30 marginT-20 onPress={() => { Actions.login() }} label='login' />
        {this.props.notife.message !== '' && (<Toaster msg={this.props.notife.message} />)}

      </View>
    )
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = ['email', 'password', 'lastName', 'firstName']

  requiredFields.forEach(field => { if (!values[field]) { errors[field] = 'Required' } })

  return errors
}

Singup = reduxForm({
  form: 'singupForm',
  validate,
})(Singup)

const mapStateToProps = state => {
  return {
    notife: state.notife.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Singup)
