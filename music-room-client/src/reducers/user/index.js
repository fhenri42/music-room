import { fromJS } from 'immutable'
import jwtDecode from 'jwt-decode'
import { Actions } from 'react-native-router-flux'

export function login (state, data) {

  const user = jwtDecode(data.token)
  Expo.SecureStore.setItemAsync('token', data.token, {})
  Actions.home()
  return state.setIn(['email'], fromJS(user.email))
    .setIn(['isAuthenticated'], fromJS(true))
    .setIn(['role'], fromJS(user.role))
    .setIn(['lastName'], fromJS(user.lastName))
    .setIn(['firstName'], fromJS(user.firstName))
    .setIn(['isActive'], fromJS(user.isActive))
    .setIn(['id'], fromJS(user.id))
    .setIn(['musicTags'], fromJS(user.musicTags))
    .setIn(['isFaceBookLogin'], fromJS(user.isFaceBookLogin))
}

export function verifeUser (state, token) {

  const user = jwtDecode(token)
  Expo.SecureStore.setItemAsync('token', token, {})

  return state.setIn(['email'], fromJS(user.email))
    .setIn(['isAuthenticated'], fromJS(true))
    .setIn(['name'], fromJS(user.name))
    .setIn(['id'], fromJS(user.id))
    .setIn(['firstName'], fromJS(user.firstName))
    .setIn(['lastName'], fromJS(user.lastName))
    .setIn(['isActive'], fromJS(user.isActive))
    .setIn(['isFaceBookLogin'], fromJS(user.isFaceBookLogin))
    .setIn(['musicTags'], fromJS(user.musicTags || []))
}
