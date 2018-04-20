import { toJS } from 'immutable'
import { Actions } from 'react-native-router-flux'
import jwtDecode from 'jwt-decode'

function verifeUser (token) {
  return {
    type: 'client/verifeUser',
    data: token,
  }
}

const simpleMiddleWare = () => ({ dispatch }) => {

  return next => action => {

    return Expo.SecureStore.getItemAsync('token', {}).then(token => {
      if (token && (Actions.currentScene === 'login' || Actions.currentScene === 'singup')) {

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
