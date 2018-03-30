import mongoose from 'mongoose'

const PlayListSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  users: Array, //[{id: 'id', role: 'role', email: 'email', super: false}] R or RW
  songs: Array, //[{id: 'id', name: 'name', grade: 0}] grade is the index of the song in the Array
})

const PlayList = mongoose.model('PlayList', PlayListSchema)

module.exports = PlayList
