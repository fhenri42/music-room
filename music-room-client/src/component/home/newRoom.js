import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from 'react-native'

import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { RadioGroup, Button, Input } from 'nachos-ui'
import { createRoom } from '../../actions/room.js'
import Toaster from '../toaster/index.js'
import { getPlaylists, getPlaylistTracks, checkSession } from '../../utils/deezerService.js'

class NewRoom extends Component {

  state = {
    disab: false,
  }
  componentWillMount () {
    checkSession(e => {
      this.setState({ disab: e })
    })
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
      onChange= {(a, b) => { input.onChange(a, b) }}
      options={['private', 'public']}
    />
  )

  onSubmit = event => {

    event.users = []
    event.users.push({ id: this.props.user.id, role: 'RW', email: this.props.user.email, super: true })
    this.props.dispatch(createRoom(event))
  }

  render () {

    const { handleSubmit, user } = this.props
    const { disab } = this.state

    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
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
        <Field
          label={'type'}
          name={'type'}
          component={this.renderRadioGroup}
        />

        <Button onPress={ handleSubmit(this.onSubmit) }>Create</Button>
      {/*  <Button disabled={!disab} onPress={() => { Actions.importList() }}>Import Play list</Button>*/}
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

NewPlaylist = reduxForm({
  form: 'singupForm',
  validate,
})(NewPlaylist)

const mapStateToProps = state => {
  return {
    user: state.user.toJS(),
    playlist: state.playlist.toJS(),
    notife: state.notife.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlaylist)
