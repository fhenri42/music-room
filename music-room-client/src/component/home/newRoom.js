import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Button, Input } from 'nachos-ui'
import { createRoom } from '../../actions/room.js'
import Toaster from '../toaster/index.js'

class NewRoom extends Component {

  renderTextField = ({ input, label, ...custom }) => (

    <Input
      style={{ margin: 15 }}
      placeholder={label}
      {...input}
      {...custom}
    />
  )

  onSubmit = event => {
    event.users = []
    event.users.push({ id: this.props.user.id, role: 'RW', email: this.props.user.email, super: true })
    event.type = 'public'
    this.props.dispatch(createRoom(event))
  }

  render () {

    const { handleSubmit, user } = this.props

    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          backgroundColor: '#1e1438',
        }}>
        <Text >New track</Text>
        <Field
          label={'Name'}
          name={'name'}
          component={this.renderTextField}
        />

        <Field
          label={'Description'}
          name={'description'}
          component={this.renderTextField}
        />

        <Button onPress={ handleSubmit(this.onSubmit) }>Create</Button>
        {this.props.notife.message !== '' && (<Toaster msg={this.props.notife.message} />)}

      </View>
    )
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = ['name', 'description', 'type']

  requiredFields.forEach(field => { if (!values[field]) { errors[field] = 'Required' } })

  return errors
}

NewRoom = reduxForm({
  form: 'singupForm',
  validate,
})(NewRoom)

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

export default connect(mapStateToProps, mapDispatchToProps)(NewRoom)
