import { callApi } from '../utils/callApi.js'

export function getClassement (user) {
  return dispatch => {
    callApi('classement/all', 'get').then(body => {
      return dispatch({
        type: 'http/getClassement',
        data: body,
      })
    }).catch(e => {
      return dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}
export function createClassement (data) {

  return dispatch => {
    callApi('classement/create', 'post', data).then(body => {
      return dispatch({
        type: 'http/getClassement',
        data: body,
      })

    }).catch(e => {
      return dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}

export function updateClassement (songs) {

  return dispatch => {
    callApi('classement/update', 'post', {songs}).then(body => {
      return dispatch({
        type: 'http/updateClassement',
        data: body,
      })
    }).catch(e => {
      return dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}
