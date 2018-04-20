import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  email: String,
  isGoogleOauth: Boolean,
  password: String,
  role: Number,
  bio: String,
  isActive: { type: Boolean, default: false },
  isFaceBookLogin: { type: Boolean, default: false },
  url: String,
  firstName: String,
  lastName: String,
  socketId: String,
  isEmailVerified: { type: Boolean, default: false },
  isEmailVerifiedToken: String,

  isPassWordReset: { type: Boolean, default: false },
  passwordResetCode: String,
  isPrivateInfo: { type: Boolean, default: false },
  musicTags: Array,
  friends: Array,
}, {
  timestamps: true,
})

UserSchema.methods.generateHash = function (password) {
  this.password = bcrypt.hashSync(password, 10)
  return this.password
}

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', UserSchema)

module.exports = User
