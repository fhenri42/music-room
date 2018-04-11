import { callApi } from '../utils/callApi.js'
import { Actions } from 'react-native-router-flux'
import { getRoomTracks } from '../utils/deezerService.js'

export function getRomm (userId) {
  return dispatch => {
    callApi(`room/all/${userId}/`, 'get').then(body => {
      return dispatch({
        type: 'http/getAllroom',
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
export function createRoom (data) {

  return dispatch => {
    callApi('room/create', 'post', data).then(body => {
      return dispatch({
        type: 'http/newRoom',
        data: body,
      })
      Actions.home()
    }).catch(e => {
      return dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}

export function addSongRoom (id, roomId, userId, songName) {

  return dispatch => {
    callApi(`room/update/${roomId}/${userId}/${id}/${songName}`, 'put').then(body => {
      return dispatch({
        type: 'http/addSongPlayList',
        data: { body, roomId },
      })
    }).catch(e => {
      return dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}

export function updateRoom (data, roomId, userId) {

  return dispatch => {
    callApi(`room/update/${roomId}/${userId}`, 'post', data).then(body => {
      return dispatch({
        type: 'http/updateRoom',
        data: { body, roomId },
      })
    }).catch(e => {
      return dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}

export function updateRoomPrivate (data, roomId, userId) {

  return dispatch => {
    callApi(`room/updatePrivate/${roomId}/${userId}`, 'post', data).then(body => {
      return dispatch({
        type: 'http/updateRoom',
        data: { body, roomId },
      })
    }).catch(e => {
      return dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}

export function deleteAUser (roomId, userId, userIdToDelete) {
  return dispatch => {
    callApi(`room/delete/user/${roomId}/${userId}/${userIdToDelete}`, 'put').then(body => {
      return dispatch({
        type: 'http/updateRoom',
        data: { body, roomId },
      })
    }).catch(e => {
      return dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}

export function importDeezerList (userId, roomArray) {

  return dispatch => {

    roomArray.forEach(e => {
      e.name = e.title
      e.type = 'private'
    })
    callApi(`room/import/list/${userId}`, 'post', { roomArray }).then(body => {
      return dispatch({
        type: 'http/getAllroom',
        data: body,
      })
    }).catch(e => {
      dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}
