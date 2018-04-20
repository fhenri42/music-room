import { fromJS } from 'immutable'
import { Actions } from 'react-native-router-flux'

export function getClassement (state, data) {
  return state.setIn(['songs'], fromJS(data.classement.songs))
}
