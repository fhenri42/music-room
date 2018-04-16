import { toJs } from 'immutable'
import { Actions } from 'react-native-router-flux'
import jwtDecode from 'jwt-decode'
import { checkSession, connectDeezer } from '../utils/deezerService.js'

function connection (data) {

  return {
    type: 'socket/connection',
    data,
  }
}

function forceLogOut () {
  return {
    type: 'client/logOut',
    data: {},
  }
}
function verifeUser (token) {
  return {
    type: 'client/verifeUser',
    data: token,
  }
}

const simpleMiddleWare = socket => ({ dispatch, getState }) => {

  return next => action => {

    return Expo.SecureStore.getItemAsync('token', {}).then(token => {
      if (token && (Actions.currentScene === 'login' || Actions.currentScene === 'singup')) {

        const userState = getState().user.toJS()
        const tmpToken = jwtDecode(token)
        if (tmpToken.isActive) {
          Actions.home()
          return dispatch(verifeUser(token))

        }
      }

      if (Actions.currentScene === 'home' && !token) { return Actions.login() }
      
      return next(action)
    })
  }
}

export default simpleMiddleWare
