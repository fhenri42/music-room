import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Input, Button, RadioGroup } from 'nachos-ui'
import { addFriend, deleteFriend } from '../../actions/user.js'
import { Icon } from 'react-native-elements'
import Toaster from '../toaster/index.js'

class AddFriend extends Component {

  renderTextField = ({ input, label, ...custom }) => (

    <Input
      style={{ margin: 15 }}
      placeholder={label}
      {...input}
      {...custom}
    />
  )

  onSubmit = event => {
    this.props.dispatch(addFriend(event.email.toLowerCase(), this.props.user.id))
  }

  render () {

    const { handleSubmit, user } = this.props

    return (
      <ScrollView>

        <Field
          label={'Email'}
          name={'email'}
          component={this.renderTextField}
        />
        <Button onPress={handleSubmit(this.onSubmit)} kind='squared'>Add</Button>

        {!!user && user.friends.length !== 0 && (
          user.friends.map((u, key) => {
            return (
              <View key={key} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                <Icon
                  raised
                  name='delete'
                  type='delete'
                  color='#f50'
                  onPress={() => { this.props.dispatch(deleteFriend(u, user.id)) }} />
                <Icon
                  raised
                  name='visibility'
                  type='visibility'
                  color='#f50'
                  onPress={() => { Actions.showProfile({ email: u, myEmail: user.email }) }} />
                <Text>{u}</Text>

              </View>
            )
          })
        )}

        {this.props.notife.message !== '' && (<Toaster msg={this.props.notife.message} />)}
      </ScrollView>

    )
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = ['email']

  requiredFields.forEach(field => { if (!values[field]) { errors[field] = 'Required' } })

  return errors
}

AddFriend = reduxForm({
  form: 'addFriendForm',
  validate,
})(AddFriend)

const mapStateToProps = state => {
  return {
    user: state.user.toJS(),
    notife: state.notife.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend)
