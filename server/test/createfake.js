import User from '../src/models/user.model'
import Playlist from '../src/models/playlist.model'
import Room from '../src/models/room.model'

// User
// email: params.email,
// isActive: false,
// url: params.url,
// firstName: params.firstName,
// lastName: params.lastName,
// bio: params.bio,
// isFaceBookLogin: false,
// isEmailVerified: false,
// isEmailVerifiedToken: tokenStr,

// Playlist
// name: params.name,
// description: params.description,
// type: params.type,
// users: params.users,


// Room
// location: {
//   active: 0,
//   distance: 0,
//   center: { lat: 0, long: 0 },
// },
// name: params.name,
// description: params.description,
// type: params.type,
// users: params.users,


const createUser = (params) => {
  return new Promise(resolve => {
    const user  = new User(params)
    user.save((err, user1) => {
      if (err) { console.log(err) }
      resolve(user1)
    })
  })
}
const createPlaylist = (params) => {
  return new Promise(resolve => {
    const playlist = new Playlist(params)
    playlist.save(err => {
      if (err) { console.log(err) }
      resolve()
    })
  })
}
const createRoom = (params) => {
  return new Promise(resolve => {
    const room = new Room(params)
    room.save(err => {
      if (err) { console.log(err) }
    })
  })
}


const arrayUsers = []
const arrOfplaylist = []
const arrOfRoom = []

for (var i = 0; i < 10; i++) {
  arrayUsers.push(createUser({
    email: `test${i}@lol.co`,
    isActive: true,
    firstName:`firstName${i}`,
    lastName:`lastName${i}`,
    isEmailVerified: true,
    isFaceBookLogin: true,
  }))
}
Promise.all(arrayUsers).then(us => {
  us.forEach((u, key) => {
    arrOfplaylist.push(createPlaylist({
      name:  `playlist${key}`,
      description: `description${key}`,
      type: key % 2 === 0 ? 'public' : 'private',
      users: [{id: u._id, role: 'RW', email: u.email, super: true}],
      songs: [],
    }))
    arrOfRoom.push(createRoom({
      name: `room${key}`,
      description: `descriptionRoom${key}`,
      type: key % 2 === 0 ? 'public' : 'private',
      users: [{id: u._id, role: 'RW', email: u.email, super: true}],
      location: {
        active: 1,
        distance: Math.floor((Math.random() * 1000) + 1),
        center: {
          long: (Math.random() * (-180 - 180) + 180).toFixed(4) * 1,
          lat: (Math.random() * (-90 - 90) + 90).toFixed(4) * 1,
        }
      }
    }))

  })
  Promise.all(arrOfplaylist).then(play =>{
    Promise.all(arrOfRoom).then(end => {

    })
  })
  // for (var i = 0; i < 10; i++) {
  //   createPlaylist({

  //   })
  //  }
})
