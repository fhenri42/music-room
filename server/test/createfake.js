import User from '../src/models/user.model'
import Playlist from '../src/models/playlist.model'
import Room from '../src/models/room.model'


const lol = (he, i) => {
  return new Promise(resolve => {
    let user = {}

    user = new User(he)
    user.save(() => {
      let playlist = {}

      playlist.type = 'public'
      playlist.name = he.firstName+'playlistname'+i.toString()+playlist.type
      playlist.users = []
      playlist.users.push(he)
      let playlistObj = {}

      playlistObj = new Playlist(playlist)
      playlistObj.save((err) => {
        console.log(err);
        playlist.type = 'private'
        playlist.name = he.firstName+'playlistname'+i.toString()+playlist.type
        playlistObj = new Playlist(playlist)
        playlistObj.save((err1) => {
          console.log(err1);
          let room = {}
          room.type = 'public'
          room.name = he.firstName+'roomname'+i.toString()+room.type
          room.users = []
          room.users.push(he)
          room.location = {
            active: 1,
            distance: 1,
            center:{
              lat: (Math.random() * 100) % 90,
              long: (Math.random() * 1000) % 180
            }
          }
          let roomObj = {}

          roomObj = new Playlist(room)
          roomObj.save((err2) => {
            console.log(err2);
            room.type = 'private'
            room.name = he.firstName+'roomname'+i.toString()+room.type
            room.location = {
              active: 1,
              distance: 1,
              center:{
                lat: (Math.random() * 100) % 90,
                long: (Math.random() * 1000) % 180
              }
            }
            roomObj = new Playlist(room)
            roomObj.save((err3) => {
              console.log(err3);
              resolve()
            })
          })
        })
      })
    })
  })
}
export default function okok () {

    const arraPromise = []

    const he = { }

    for (let i =0;i <10; i++) {

      he.firstName = 'test'+i.toString()
      he.lastName = 'testLast'+i.toString()
      he.email = i.toString()+'email@test.co'
      arraPromise.push(lol(he,i))
    }
    Promise.all(arraPromise).then(res => {
      console.log(res);
    })
  }
