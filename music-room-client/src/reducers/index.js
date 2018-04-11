import { fromJS } from 'immutable'

import { login, verifeUser } from './user/index.js'
import { updateListOfplayList, setListOfPlaylist, updatePlaylist } from './playlist/index.js'
import { updateListOfroom, setListOfRoom, updateRoom } from './room/index.js'

const intialStateUser = {
  firstName: '',
  lastName: '',
  email: '',
  role: -1,
  isAuthenticated: false,
  url: '',
  isArbitrage: false,
  birthdate: null,
  goal: 0,
  language: '',
  funds: [],
  id: '',
}

const intialStatePlaylist = {
  playlists: [],
  nbr: 0,
}

const intialStateRoom = {
  rooms: [],
  nbr: 0,
}

const intialStateNotife = {
  message: '',
}

export default class reducer {

  static user (state = fromJS(intialStateUser), action) {
    switch (action.type) {
    case 'http/login':
      return login(state, action.data)
    case 'client/verifeUser':
      return verifeUser(state, action.data)
    case 'client/logOut':
      return state = fromJS(intialStateUser)
    case 'http/userUpdate':
      return updateU(state, action.data)
    default:
      return state
    }
  }

  static playlist (state = fromJS(intialStatePlaylist), action) {
    switch (action.type) {
    case 'http/getAllplayList':
      return setListOfPlaylist(state, action.data)
    case 'http/newPlayList':
      return updateListOfplayList(state, action.data)
    case 'http/addSongPlayList':
      return updatePlaylist(state, action.data)
    case 'http/updatePlaylist':
      return updatePlaylist(state, action.data)
    default:
      return state
    }
  }

  static room (state = fromJS(intialStateRoom), action) {
    switch (action.type) {
    case 'http/getAllroom':
      return setListOfRoom(state, action.data)
    case 'http/newRoom':
      return updateListOfRoom(state, action.data)
    case 'http/addSongRoom':
      return updateRoom(state, action.data)
    case 'http/updateRoom':
      return updateRoom(state, action.data)
    default:
      return state
    }
  }

  static notife (state = fromJS(intialStateNotife), action) {
    switch (action.type) {
    case 'client/addNotife':
      return state.setIn(['message'], fromJS(action.data))
    case 'client/delNotife':
      return state.setIn(['message'], fromJS(''))
    default:
      return state
    }
  }

}
