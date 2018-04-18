import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Input, Button, RadioGroup } from 'nachos-ui'
import { updateUser } from '../../actions/user.js'
import { TagsInput } from 'react-native-ui-lib'

class publicUpdate extends Component {

state = {
  tags: this.props.initialValues.musicTags,
}
  renderTextField = ({ input, label, ...custom }) => (

    <Input
      style={{ margin: 15 }}
      placeholder={label}
      {...input}
      {...custom}
    />
  )
  renderRadioGroup = () => (
    <RadioGroup
      style={{ margin: 15 }}
      onChange= {(a, b) => { input.onChange(a, b) }}
      options={['public', 'friendOnly']}
    />
  )
  renderTags = () => (
    <TagsInput
      containerStyle={{ marginBottom: 20 }}
      placeholder='Music Tags'
      tags={this.state.tags}
      onChangeTags={(tags) => this.setState({ tags })}
      getLabel={(tag) => tag.label}
      inputStyle={{ fontSize: 22, color: 'blue' }}
      renderTag={(tag) => <View>
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

const validate = () => {
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
