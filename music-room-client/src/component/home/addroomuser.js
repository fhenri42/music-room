import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Card, Input, H4, Switcher, TabButton, Button, RadioGroup } from 'nachos-ui'

import { updateRoomPrivate, deleteAUser } from '../../actions/room.js'
import { Icon } from 'react-native-elements'
import Toaster from '../toaster/index.js'

class AddNewUser extends Component {

  renderTextField = ({ input, label, meta: { touched, error }, ...custom, secureTextEntry }) => (

    <Input
      style={{ margin: 15 }}
      placeholder={label}
      {...input}
      {...custom}
    />
  )
  renderRadioGroup = ({ input, label, meta: { touched, error }, ...custom }) => (
    <RadioGroup
      style={{ margin: 15 }}
      onChange= {(a, b) => { input.onChange(a, b) }}
      options={['read', 'read&&write']}
    />
  )

  onSubmit = event => {

    this.props.dispatch(updateRoomPrivate(event, this.props.plId, this.props.userId))
  }

  render () {

    const { handleSubmit, users } = this.props
    return (
      <View>
        <Field
          label={'Email'}
          name={'email'}
          component={this.renderTextField}
        />
        <Field
          label={'type'}
          name={'type'}
          component={this.renderRadioGroup}
        />

        <Button onPress={handleSubmit(this.onSubmit)}>Add</Button>
        {!!users && users.length !== 0 && (
          users.map((u, key) => {
            return u.super === true ? (<View key={key}/>) : (<View key={key} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '20%' }}>
              <Icon
                raised
                name='delete'
                type='delete'
                color='#f50'
                onPress={() => { this.props.dispatch(deleteAUser(this.props.plId, this.props.userId, u.id)) }} />
              <Icon
                raised
                name='compare-arrows'
                type='compare-arrows'
                color='#f50'
                onPress={() => { this.props.dispatch(updateRoomPrivate({ email: u.email, type: u.role !== 'R' ? 'read' : 'read&&write' }, this.props.plId, this.props.userId)) }} />
              <Text>{u.email}</Text>
              <Text>{` Role: ${u.role}`}</Text>
            </View>)
          })
        )}
  

      </View>
    )
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = ['email', 'type']

  requiredFields.forEach(field => { if (!values[field]) { errors[field] = 'Required' } })

  return errors
}

AddNewUser = reduxForm({
  form: 'singupForm',
  validate,
})(AddNewUser)

const mapStateToProps = state => {
  return {
    user: state.user.toJS(),
    room: state.room.toJS(),
    notife: state.notife.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewUser)
