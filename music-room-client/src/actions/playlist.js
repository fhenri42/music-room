import { callApi } from '../utils/callApi.js'
import { Actions } from 'react-native-router-flux'
import { getPlaylistTracks } from '../utils/deezerService.js'

export function getPlayList (userId) {
  return dispatch => {
    callApi(`playlist/all/${userId}/`, 'get').then(body => {
      return dispatch({
        type: 'http/getAllplayList',
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
export function createPlayList (data) {

  return dispatch => {
    callApi('playlist/create', 'post', data).then(body => {
      Actions.home({mode:1})
      return dispatch({
        type: 'http/newPlayList',
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

export function addSongPlaylist (id, playlistId, userId, songName) {

  return dispatch => {
    callApi(`playlist/update/${playlistId}/${userId}/${id}/${songName}`, 'put').then(body => {
      return dispatch({
        type: 'http/addSongPlayList',
        data: { body, playlistId },
      })
    }).catch(e => {
      return dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}

export function updatePlaylist (data, playlistId, userId) {

  return dispatch => {
    callApi(`playlist/update/${playlistId}/${userId}`, 'post', data).then(body => {
      return dispatch({
        type: 'http/updatePlaylist',
        data: { body, playlistId },
      })
    }).catch(e => {
      return dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}

export function updatePlaylistPrivate (data, playlistId, userId) {

  return dispatch => {
    callApi(`playlist/updatePrivate/${playlistId}/${userId}`, 'post', data).then(body => {
      return dispatch({
        type: 'http/updatePlaylist',
        data: { body, playlistId },
      })
    }).catch(e => {
      return dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}

export function deleteAUser (playlistId, userId, userIdToDelete) {
  return dispatch => {
    callApi(`playlist/delete/user/${playlistId}/${userId}/${userIdToDelete}`, 'put').then(body => {
      return dispatch({
        type: 'http/updatePlaylist',
        data: { body, playlistId },
      })
    }).catch(e => {
      return dispatch({
        type: 'client/addNotife',
        data: e,
      })
    })
  }
}

export function importDeezerList (userId, playListArray) {

  return dispatch => {

    playListArray.forEach(e => {
      e.name = e.title
      e.type = 'private'
    })
    callApi(`playlist/import/list/${userId}`, 'post', { playListArray }).then(body => {
      return dispatch({
        type: 'http/getAllplayList',
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
