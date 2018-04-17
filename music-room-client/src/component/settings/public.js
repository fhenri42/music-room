import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Card, Input, H4, Switcher, TabButton, Button, RadioGroup } from 'nachos-ui'

import { updateUser } from '../../actions/user.js'
import { TagsInput } from 'react-native-ui-lib'
import Toaster from '../toaster/index.js'

class publicUpdate extends Component {

state = {
  tags: this.props.initialValues.musicTags,
}
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
      options={['public', 'friendOnly']}
    />
  )
  renderTags = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TagsInput
      containerStyle={{ marginBottom: 20 }}
      placeholder='Music Tags'
      tags={this.state.tags}
      onChangeTags={(tags) => this.setState({ tags })}
      getLabel={(tag) => tag.label}
      inputStyle={{ fontSize: 22, color: 'blue' }}
      renderTag={(tag, index, shouldMarkTagToRemove) => <View>
        <Text>{tag}</Text>
      </View>}
      hideUnderline={true}
    />
  )
  onSubmit = event => {
    event.musicTags = this.state.tags
    event.isPrivateInfo = event.isPrivateInfo === 'public'
    this.props.dispatch(updateUser(event, this.props.user.id))
  }

  render () {

    const { handleSubmit, initialValues } = this.props

    return (
      <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
        <Field
          label={'FirstName'}
          name={'firstName'}
          component={this.renderTextField}
        />
        <Field
          label={'LastName'}
          name={'lastName'}
          component={this.renderTextField}
        />
        <Field
          label={'musicTags'}
          name={'musicTags'}
          component={this.renderTags}
        />
        <Field
          label={'isPrivateInfo'}
          name={'isPrivateInfo'}
          component={this.renderRadioGroup}
        />
        <Button kind='squared' onPress={handleSubmit(this.onSubmit)}>Update</Button>

      </View>
    )
  }
}

const validate = values => {
  const errors = {}
  return errors
}

publicUpdate = reduxForm({
  form: 'singupForm',
  validate,
})(publicUpdate)

const mapStateToProps = state => {
  return {
    user: state.user.toJS(),
    initialValues: state.user.toJS(),
    notife: state.notife.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(publicUpdate)
