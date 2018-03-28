import filter from 'filter-object'
import Playlist from '../models/playlist.model'

const createParams = '{name,description,type,users,songs}'

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
    }).catch((e) => {
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

    console.log(req.params.userId);
    Playlist.find().then(playLists => {

      console.log(require('util').inspect(playLists, { depth: null }));
      const arrayToSend = []
      playLists.forEach(playList => {

        playList.users.forEach(u => {
          if (u.id === req.params.userId) { arrayToSend.push(playList) }
        })
      })
      console.log(arrayToSend);
      return res.json({ message: 'Your playLists', playLists: arrayToSend }) /* istanbul ignore next */
    }).catch((e) => {
      console.log(e);
      return res.status(500).send({ message: 'Internal serveur error' })
    })
  }


  static updatePublic (req, res) {
    const params = filter(req.body, updateParamsPublic)

    Playlist.findOne({ _id: req.paramsplayListId }).then(playList => {

      let test = false
      playList.users.forEach(u => {
        if (u.id === req.params.userId) {
          test = true
        }
      })
      if (!test) { return res.status(403).send({ message: 'You are not allowed to access this playList' }) }

      Playlist.findOneAndUpdate({  _id: req.paramsplayListId }, { $set: params }, { new: true }).then(playList => {
        return res.json({ message: 'Your playList', playList })
      }).catch(() => {
        return res.status(500).send({ message: 'Internal serveur error' })
      })
    })
  }

  static addMusicToList (req, res) {

    Playlist.findOne({ _id: req.params.playListId }).then(playList => {
      if(!playList) { return res.status(404).send({ message: 'No playList find' }) }
      let test = false
      playList.users.forEach(u => {
        if (u.id === req.params.userId) {
          test = true
        }
      })
      if (!test) { return res.status(403).send({ message: 'You are not allowed to access this playList' }) }

      let songs = playList.songs
      songs.push(req.params.newId)
      Playlist.findOneAndUpdate({  _id: req.params.playListId }, { $set: { songs: songs} }, { new: true }).then(playList => {
        console.log('playList =>',playList);
        return res.json({ message: 'Your playList', playlist: playList })
      }).catch((e) => {
        console.log(e);
        return res.status(500).send({ message: 'Internal serveur error' })
      })
    })
  }
}
