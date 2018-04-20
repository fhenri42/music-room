import UserController from '../controllers/user.controller'
import { isLogin } from './validators'

export default [

  /**
  * @api {Post} /user/create Create a new user
  * @apiName UserController
  * @apiGroup Create
  *
  * @apiDescription Create a new user
  *
  * @apiParam {String} email  email
  * @apiParam {String} password  password
  * @apiParam {String} firstName  firstName
  * @apiParam {String} lastName  lastName
  * @apiParam {String} bio  bio
  *
  * @apiSuccess {String} tokenJWT User information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 400 email is invalid) {String} message Return if email is already in use
  *
  */
  {
    method: 'POST',
    path: '/user/create',
    handler: UserController.create,
    validator: [],
  },
  /**
  * @api {Get} /user/:email Get a user
  * @apiName UserController
  * @apiGroup getMe
  *
  * @apiDescription Get the information of a user
  *
  * @apiHeader {X-PASS} password password
  * @apiParam {String} email  email
  *
  * @apiSuccess {String} tokenJWT User information
  *
  * @apiError (Bad Request 404 email is invalid) {String} message Return if email is not found
  * @apiError (Bad Request 403 password is invalid) {String} message Return if password does not match
  *
  */

  {
    method: 'GET',
    path: '/user/:email',
    handler: UserController.getMe,
    validator: [],
  },

  /**
  * @api {Post} /user/update/:id  Update a user
  * @apiName UserController
  * @apiGroup updatePublic
  *
  * @apiDescription Update the information of a user
  *
  * @apiParam {String} firstName  firstName
  * @apiParam {String} lastName  lastName
  * @apiParam {String} tags  tags
  * @apiParam {String} musicTags  musicTags
  * @apiParam {String} isPrivateInfo  isPrivateInfo
  *
  * @apiSuccess {String} tokenJWT User information
  *
  * @apiError (Bad Request 401 email is invalid) {String} message Return if this email is already use
  * @apiError (Bad Request 404 password is invalid) {String} message Return if we did not find any User
  *
  */

  {
    method: 'POST',
    path: '/user/update/:id',
    handler: UserController.updatePublic,
    validator: [isLogin],
  },

  /**
  * @api {Post} /user/update/privatePassword/:id  Update a user
  * @apiName UserController
  * @apiGroup updatePrivate
  *
  * @apiDescription Update the information private of a user
  *
  * @apiParam {String} email  email
  * @apiParam {String} newPassword  newPassword

  *
  * @apiSuccess {String} tokenJWT User information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 401 email is invalid) {String} message Return if this email is already used
  */
  {
    method: 'POST',
    path: '/user/update/private/:id',
    handler: UserController.updatePrivate,
    validator: [isLogin],
  },

  /**
  * @api {Put} /user/verifyEmail Verified a email of a user
  * @apiName UserController
  * @apiGroup verifyEmail
  *
  * @apiDescription Verifie a email of a user
  *
  * @apiParam {String} email  email
  * @apiParam {String} code  code

  *
  * @apiSuccess {String} tokenJWT User information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 403 token is invalid) {String} message Return This is not a valid account, or was previously update
  */
  {
    method: 'PUT',
    path: '/user/verifyEmail/:email/:code',
    handler: UserController.verifyEmail,
    validator: [],
  },

  /**
  * @api {Get} /user/resetPassword Reset password of a user
  * @apiName UserController
  * @apiGroup resetPassword
  *
  * @apiDescription Reset password of a user
  *
  * @apiParam {String} email  email

  *
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 404 account is invalid) {String} message Return No account whit this email
  */

  {
    method: 'GET',
    path: '/user/resetPassword/:email',
    handler: UserController.resetPassword,
    validator: [],
  },

  /**
  * @api {Put} /user/resetVerefiPassword Reset password of a verify user
  * @apiName UserController
  * @apiGroup resetVerefiPassword
  *
  * @apiDescription Reset password of a verify user
  *
  * @apiParam {String} email  email
  * @apiParam {String} code  code
  * @apiParam {String} newPassword  newPassword

  *
  * @apiSuccess {String} tokenJWT User information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 403 account is invalid) {String} message Return This is not a valid account, or was previously update
  */

  {
    method: 'PUT',
    path: '/user/resetPassword/:email/:code/:newPassword',
    handler: UserController.resetVerefiPassword,
    validator: [],
  },

  /**
  * @api {Post} /user/facebookCreate Create facebook account
  * @apiName UserController
  * @apiGroup facebookCreate
  *
  * @apiDescription Create facebook account
  *
  * @apiParam {String} access_token  access_token

  *
  * @apiSuccess {String} tokenJWT User information
  *
  * @apiError (Bad Request 403 invalid Facebook) {String} message Return What the fuck are you doing ?
  */

  {
    method: 'POST',
    path: '/user/create/facebook',
    handler: UserController.facebookCreate,
    validator: [],
  },

  /**
  * @api {Post} /user/facebookLink Link facebook in account
  * @apiName UserController
  * @apiGroup facebookLink
  *
  * @apiDescription Link facebook in account
  *
  * @apiParam {String} access_token  access_token

  *
  * @apiSuccess {String} tokenJWT User information
  *
  * @apiError (Bad Request 403 invalid Facebook) {String} message Return What the fuck are you doing ?
  */

  {
    method: 'POST',
    path: '/user/link/facebook/:id',
    handler: UserController.facebookLink,
    validator: [],
  },

  /**
  * @api {Put} /user/addFriend/:email/:userId Add a friend to a user
  * @apiName UserController
  * @apiGroup addFriend
  *
  * @apiDescription Add a friend to a user
  *
  * @apiParam {String} email  email
  * @apiParam {String} userId userId
  *
  * @apiSuccess {String} tokenJWT User information
  *
  * @apiError (Bad Request 404 invalid Facebook) {String} message Return Did not find any user
  */

  {
    method: 'PUT',
    path: '/user/addFriend/:email/:userId',
    handler: UserController.addFriend,
    validator: [],
  },

  /**
  * @api {Put} /user/deleteFriend/:email/:userId Delete a friend of a user
  * @apiName UserController
  * @apiGroup addFriend
  *
  * @apiDescription delete a friend of a user
  *
  * @apiParam {String} email  email
  * @apiParam {String} userId userId
  *
  * @apiSuccess {String} tokenJWT User information
  *
  * @apiError (Bad Request 404 invalid Facebook) {String} message Return Did not find any user
  */

  {
    method: 'PUT',
    path: '/user/deleteFriend/:email/:userId',
    handler: UserController.deleteFriend,
    validator: [],
  },

]
