import jwt from 'jsonwebtoken'
// import User from '../models/user.model'

import config from '../../config'

export const JWT_SECRET = config.local.jwtSecret

export function generateToken (user) {
  // 1. Dont use password and other sensitive fields
  // 2. Use fields that are useful in other parts of the
  // app/collections/models
  const u = {
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    id: user._id,
    musicTags: user.musicTags,
    isPrivateInfo: user.isPrivateInfo,
    isActive: user.isActive,
    isFaceBookLogin: user.isFaceBookLogin,
    friends: user.friends,
  }
  let expiresIn = 60 * 60 * 24 // 24 hours
  if (process.env.NODE_ENV !== 'production') {
    expiresIn *= 3 // 3 days;
  }
  return jwt.sign(u, JWT_SECRET, {
    expiresIn,
  })
}

// export function verifyToken(token, next) {
//   // Check token that was passed by decoding token using secret
//   jwt.verify(token, JWT_SECRET, function (err, user) {
//     if (err) {
//       next(err, null);
//     } else {
//       // later we will return the user updated
//       // but it is also done to check if the user still exists
//       User.findOne({ _id: user._id })
//         .populate('influencerId')
//         .exec((err, userDoc) => {
//           next(err, userDoc);
//         })
//     }
//   });
// }
