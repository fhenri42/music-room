import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Input, Button, RadioGroup } from 'nachos-ui'
import { updatePlaylistPrivate, deleteAUser } from '../../actions/playlist.js'
import { Icon } from 'react-native-elements'

class AddNewUser extends Component {

  renderTextField = ({ input, label, ...custom }) => (

    <Input
      style={{ margin: 15 }}
      placeholder={label}
      {...input}
      {...custom}
    />
  )
  renderRadioGroup = ({ input }) => (
    <RadioGroup
      style={{ margin: 15 }}
      onChange= {(a, b) => { input.onChange(a, b) }}
      options={['read', 'read&&write']}
    />
  )

  onSubmit = event => {

    this.props.dispatch(updatePlaylistPrivate(event, this.props.plId, this.props.userId))
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
                onPress={() => { this.props.dispatch(updatePlaylistPrivate({ email: u.email, type: u.role !== 'R' ? 'read' : 'read&&write' }, this.props.plId, this.props.userId)) }} />
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
    playlist: state.playlist.toJS(),
    notife: state.notife.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewUser)
