import mongoose from 'mongoose'

const ClassementSchema = new mongoose.Schema({
  songs: Array // [{id: 'id', name: 'name', grade: 0}] grade is the index of the song in the Array
})

const Classement = mongoose.model('Classement', ClassementSchema)

module.exports = Classement
