import filter from 'filter-object'
import Room from '../models/room.model'
import User from '../models/user.model'
import _ from 'lodash'
import request from 'superagent'

const createParams = '{name,description,location,type,users,songs}'
const updateParamsPublic = '{songs,users,description,location,type}'
const updateParamsPrivate = '{type,email,location}'

function getDistanceFromLatLonInKm (lat1, lon1, lat2, lon2) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1) // deg2rad below
  const dLon = deg2rad(lon2 - lon1)
  const a
    = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d
}

function deg2rad (deg) {
  return deg * (Math.PI / 180)
}

export default class RoomController {

  static create (req, res) {

    const params = filter(req.body, createParams)
    if (!params || !params.name) { return res.status(401).send({ message: 'Messing parameters.' }) }

    Room.findOne({ name: params.name }).then(u => {
      if (u) { return res.status(400).send({ message: 'An room already exist with this name.' }) }

      const room = new Room({
        location: {
          active: 0,
          distance: 0,
          center: { lat: 0, long: 0 },
        },
        name: params.name,
        description: params.description,
        type: params.type,
        users: params.users,
      })

      room.save(err => {
        if (err) { return res.status(500).send({ message: 'internal serveur error' }) }
        return res.json({ message: 'Your room', room })
      })
    }).catch(() => {
      return res.status(500).send({ message: 'Internal serveur error' })
    })
  }

  static getRoomByName (req, res) {

    Room.findOne({ name: req.params.name }).then(room => {
      if (room.type === 0) {
        let test = false
        room.users.forEach(u => {
          if (u.id === req.params.userId) {
            test = true
          }
        })
        if (!test) { return res.status(403).send({ message: 'You are not allowed to access this room' }) }

      }
      return res.json({ message: 'Your room', room }) /* istanbul ignore next */
    }).catch(() => {
      return res.status(500).send({ message: 'Internal serveur error' })
    })
  }

  static getRoomAll (req, res) {
    Room.find().then(rooms => {
      const arrayToSend = []
      rooms.forEach(room => {
        if (room.type === 'public'
        || (room.type === 'private' && req.params.long && req.params.lat && room.location.active === 1
        && (getDistanceFromLatLonInKm(room.location.center.lat, room.location.center.long, req.params.lat, req.params.long) <= room.location.distance))) {
          arrayToSend.push(room)
        } else {
          room.users.forEach(u => { if (u.id === req.params.userId && room.type === 'private') { arrayToSend.push(room) } })
        }
      })
      return res.json({ message: 'Your rooms', rooms: arrayToSend }) /* istanbul ignore next */
    }).catch(() => { return res.status(500).send({ message: 'Internal serveur error' }) })
  }

  static deleteUser (req, res) {
    Room.findOne({ _id: req.params.roomId }).then(room => {

      if (!room) { return res.status(404).send({ message: 'No room found' }) }

      let index = -1
      room.users.forEach((u, key) => {
        if (req.params.userIdToDelete.toString() === u.id) {
          index = key
        }
      })

      room.users.splice(index, 1)
      Room.findOneAndUpdate({ _id: req.params.roomId }, { $set: { users: room.users } }, { new: true }).then(room => {
        room.songs = _.sortBy(room.songs, ['vote'], ['desc'])
        return res.json({ message: 'Your room', room })
      }).catch(() => {
        return res.status(500).send({ message: 'Internal serveur error' })
      })
    })
  }

  static updatePrivate (req, res) {
    const params = filter(req.body, updateParamsPrivate)

    Room.findOne({ _id: req.params.roomId }).then(room => {
      if (!room) { return res.status(404).send({ message: 'No room found' }) }
      User.findOne({ email: params.email }).then(user => {
        if (!user) { return res.status(404).send({ message: 'No user found' }) }
        if (user._id.toString() === req.params.userId) { return res.status(403).send({ message: 'You can\'t add your self' }) }
        let test = false
        let doubleUser = false
        let index = -1
        room.users.forEach((u, key) => {
          if (u.id === req.params.userId && u.role === 'RW') {
            test = true
          }
          if (user._id.toString() === u.id) {
            doubleUser = true
            index = key
          }
        })
        if (!test) { return res.status(403).send({ message: 'You are not allowed to access this room' }) }

        const users = room.users
        let tmpT = 'R'
        if (params.type.toString() === 'read') { tmpT = 'R' }
        if (params.type.toString() === 'read&&write') { tmpT = 'RW' }
        if (!doubleUser) { users.push({ id: user.id, role: tmpT, email: user.email, super: false }) } else { users[index] = { id: user.id, role: tmpT, email: user.email, super: false } }

        Room.findOneAndUpdate({ _id: req.params.roomId }, { $set: { users } }, { new: true }).then(room => {
          room.songs = _.sortBy(room.songs, ['vote'], ['desc'])

          return res.json({ message: 'Your room', room })
        }).catch(() => {
          return res.status(500).send({ message: 'Internal serveur error' })
        })
      })
    })
  }

  static updatePublic (req, res) {
    const params = filter(req.body, updateParamsPublic)

    Room.findOne({ _id: req.params.roomId }).then(room => {
      console.log('room =>', room)
      if (!room) { return res.status(404).send({ message: 'No room found' }) }
      Room.findOneAndUpdate({ _id: req.params.roomId }, { $set: params }, { new: true }).then(room => {
        room.songs = _.sortBy(room.songs, ['vote'], ['desc'])

        return res.json({ message: 'Your room', room })
      }).catch(() => {
        return res.status(500).send({ message: 'Internal serveur error' })
      })
    })
  }

  static addMusicToList (req, res) {

    Room.findOne({ _id: req.params.roomId }).then(room => {
      console.log('room =>', room)
      
      if (!room) { return res.status(404).send({ message: 'No room found' }) }
      const songs = room.songs
      songs.push({ id: req.params.newId, grade: songs.length - 1, name: req.params.songName, vote: 0 })
      Room.findOneAndUpdate({ _id: req.params.roomId }, { $set: { songs } }, { new: true }).then(room => {
        room.songs = _.sortBy(room.songs, ['vote'], ['desc'])

        return res.json({ message: 'Your room', room })
      }).catch(() => { return res.status(500).send({ message: 'Internal serveur error' }) })
    })
  }

}
