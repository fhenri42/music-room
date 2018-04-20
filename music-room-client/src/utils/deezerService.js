import { NativeModules } from 'react-native'

const DeezerManager = NativeModules.DeezerManager

export function connectDeezer () {
  return new Promise((resolve, reject) => {
    DeezerManager.connect((decision) => { decision ? resolve(decision) : reject(decision) })
  })
}

export function disconnectDeezer () {
  return new Promise((resolve) => {
    DeezerManager.disconnect((test) => {
      resolve(test)
    })
  })
}
export function checkSession (cb) { DeezerManager.isSessionValid(cb) }

export function playTrack (id) {
  return new Promise((resolve) => {
    DeezerManager.playTrack(id).then((res) => {
      resolve(res)
    })
  })
}

export function getPlaylistTracks (id) {
  return new Promise((resolve) => {
    DeezerManager.getPlaylistTracks(id).then(res => {
      resolve(res)
    })
  })
}

export function getFavoritesTracks () {
  return new Promise((resolve) => {
    DeezerManager.getFavoritesTracks().then(res => {
      resolve(res)
    })
  })
}

export function getPlaylists () {
  return new Promise((resolve) => {
    DeezerManager.getPlaylists().then(res => {
      resolve(res)
    })
  })
}

export function pause () { DeezerManager.pause() }

export function play () { DeezerManager.play() }

export function isPlayingDeezer (cb) { DeezerManager.isPlaying(cb) }
