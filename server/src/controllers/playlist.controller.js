import filter from 'filter-object'
import Playlist from '../models/playlist.model'
import User from '../models/user.model'
import _ from 'lodash'
import request from 'superagent'

const createParams = '{name,description,type,users,songs}'
const updateParamsPublic = '{songs,users,description,type}'
const updateParamsPrivate = '{type,email}'

const test = (list, id, email) => {
  return new Promise((resolve, reject) => {
    Playlist.findOne({ name: list.name }).then(u => {
      if (u) { return reject('An playList already exist with this name.') }

      request.get(`https://api.deezer.com/playlist/${list.id}`)
        .set('Accept', 'application/json')
        .then((res) => {
          const body = JSON.parse(res.text)
          if (body.error) { resolve() }
          const tmp = []

          if (body && body.tracks && body.tracks.data) {
            body.tracks.data.forEach((t, key) => {
              tmp.push({ id: t.id, name: t.title, grade: key })
            })
          }

          const playList = new Playlist({
            name: list.name,
            description: list.description,
            type: 'public',
            users: [{ id, role: 'RW', email, super: true }],
            songs: tmp,
          })

          playList.save(err => {
            if (err) { reject('internal serveur error') }
            resolve()
          })
        })
        .catch(() => {
          return reject(e.response.body.message || e.message)
        })

    })
  })
}

export default class PlaylistController {

  static create (req, res) {

    const params = filter(req.body, createParams)
    if (!params || !params.name) { return res.status(401).send({ message: 'Messing parameters.' }) }

    Playlist.findOne({ name: params.name }).then(u => {
      if (u) { return res.status(400).send({ message: 'An playList already exist with this name.' }) }

      const playList = new Playlist({
        name: params.name,
        description: params.description,
        type: params.type,
        users: params.users,
      })

      playList.save(err => {
        if (err) { return res.status(500).send({ message: 'internal serveur error' }) }
        return res.json({ message: 'Your playList', playlist: playList })
      })
    }).catch(() => {
      return res.status(500).send({ message: 'Internal serveur error' })
    })
  }

  static getPlaylistByName (req, res) {

    Playlist.findOne({ name: req.params.name }).then(playList => {
      if (playList.type === 0) {
        let test = false
        playList.users.forEach(u => {
          if (u.id === req.params.userId) {
            test = true
          }
        })
        if (!test) { return res.status(403).send({ message: 'You are not allowed to access this playList' }) }

      }
      return res.json({ message: 'Your playList', playList }) /* istanbul ignore next */
    }).catch(() => {
      return res.status(500).send({ message: 'Internal serveur error' })
    })
  }

  // TODO A CHANGER DE OUF
  static getPlaylistAll (req, res) {

    Playlist.find().then(playLists => {

      const arrayToSend = []

      playLists.forEach(playList => { playList.users.forEach(u => { if (u.id === req.params.userId && playList.type === 'private') { arrayToSend.push(playList) } }) })
      playLists.forEach(playList => { if (playList.type === 'public') { arrayToSend.push(playList) } })
      playLists.forEach(p => {
        p.songs = _.sortBy(p.songs, ['grade'])

      })
      return res.json({ message: 'Your playLists', playLists: arrayToSend }) /* istanbul ignore next */
    }).catch(() => { return res.status(500).send({ message: 'Internal serveur error' }) })
  }

  static deleteUser (req, res) {
    Playlist.findOne({ _id: req.params.playListId }).then(playList => {

      if (!playList) { return res.status(404).send({ message: 'No playList found' }) }

      let index = -1
      playList.users.forEach((u, key) => {
        if (req.params.userIdToDelete.toString() === u.id) {
          index = key
        }
      })

      playList.users.splice(index, 1)
      Playlist.findOneAndUpdate({ _id: req.params.playListId }, { $set: { users: playList.users } }, { new: true }).then(playlist => {
        playlist.songs = _.sortBy(playlist.songs, ['grade'])
        return res.json({ message: 'Your playList', playlist })
      }).catch(() => {
        return res.status(500).send({ message: 'Internal serveur error' })
      })
    })
  }

  static updatePrivate (req, res) {
    const params = filter(req.body, updateParamsPrivate)

    Playlist.findOne({ _id: req.params.playListId }).then(playList => {
      if (!playList) { return res.status(404).send({ message: 'No playList found' }) }
      User.findOne({ email: params.email }).then(user => {
        if (!user) { return res.status(404).send({ message: 'No user found' }) }
        if (user._id.toString() === req.params.userId) { return res.status(403).send({ message: 'You can\'t add your self' }) }
        let test = false
        let doubleUser = false
        let index = -1
        playList.users.forEach((u, key) => {
          if (u.id === req.params.userId && u.role === 'RW') {
            test = true
          }
          if (user._id.toString() === u.id) {
            doubleUser = true
            index = key
          }
        })
        if (!test) { return res.status(403).send({ message: 'You are not allowed to access this playList' }) }

        const users = playList.users
        let tmpT = 'R'
        if (params.type.toString() === 'read') { tmpT = 'R' }
        if (params.type.toString() === 'read&&write') { tmpT = 'RW' }
        if (!doubleUser) { users.push({ id: user.id, role: tmpT, email: user.email, super: false }) } else { users[index] = { id: user.id, role: tmpT, email: user.email, super: false } }

        Playlist.findOneAndUpdate({ _id: req.params.playListId }, { $set: { users } }, { new: true }).then(playlist => {
          playlist.songs = _.sortBy(playlist.songs, ['grade'])

          return res.json({ message: 'Your playList', playlist })
        }).catch(() => {
          return res.status(500).send({ message: 'Internal serveur error' })
        })
      })
    })
  }

  static updatePublic (req, res) {
    const params = filter(req.body, updateParamsPublic)

    Playlist.findOne({ _id: req.params.playListId }).then(playList => {
      if (!playList) { return res.status(404).send({ message: 'No playList found' }) }

      let test = false
      playList.users.forEach(u => {
        if (u.id === req.params.userId && u.role === 'RW') {
          test = true
        }
      })
      if (!test) { return res.status(403).send({ message: 'You are not allowed to access this playList' }) }

      Playlist.findOneAndUpdate({ _id: req.params.playListId }, { $set: params }, { new: true }).then(playlist => {
        playlist.songs = _.sortBy(playlist.songs, ['grade'])

        return res.json({ message: 'Your playList', playlist })
      }).catch(() => {
        return res.status(500).send({ message: 'Internal serveur error' })
      })
    })
  }

  static addMusicToList (req, res) {

    Playlist.findOne({ _id: req.params.playListId }).then(playList => {
      if (!playList) { return res.status(404).send({ message: 'No playList found' }) }
      let test = false
      playList.users.forEach(u => {
        if (u.id === req.params.userId && u.role === 'RW') {
          test = true
        }
      })
      if (!test) { return res.status(403).send({ message: 'You are not allowed to access this playList' }) }

      const songs = playList.songs
      songs.push({ id: req.params.newId, grade: songs.length - 1, name: req.params.songName })
      Playlist.findOneAndUpdate({ _id: req.params.playListId }, { $set: { songs } }, { new: true }).then(playlist => {
        playlist.songs = _.sortBy(playlist.songs, ['grade'])

        return res.json({ message: 'Your playlist', playlist })
      }).catch(() => { return res.status(500).send({ message: 'Internal serveur error' }) })
    })
  }

  static importPlayList (req, res) {
    const playListArray = req.body.playListArray
    const promiseArra = []
    User.findOne({ _id: req.params.userId }).then(user => {

      if (!user) { return res.status(404).send({ message: 'User not found' }) }

      playListArray.forEach(e => { promiseArra.push(test(e, user.id, user.email)) })
      Promise.all(promiseArra).then(() => {

        Playlist.find().then(playLists => {

          const arrayToSend = []

          playLists.forEach(playList => { playList.users.forEach(u => { if (u.id === req.params.userId && playList.type === 'private') { arrayToSend.push(playList) } }) })
          playLists.forEach(playList => { if (playList.type === 'public') { arrayToSend.push(playList) } })
          playLists.forEach(p => { p.songs = _.sortBy(p.songs, ['grade']) })
          return res.json({ message: 'Your playLists', playLists: arrayToSend }) /* istanbul ignore next */
        })
      })
    })
  }

}
