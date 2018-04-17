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
  * @api {Get} /user/:email get a user
  * @apiName UserController
  * @apiGroup getMe
  *
  * @apiDescription get the information of a user
  *
  * @apiHeader {X-PASS} password password
  * @apiParam {String} email  email
  *
  * @apiSuccess {String} tokenJWT User information
  * @apiSuccess {String} message success message
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
  * @api {Post} /user/update/:id  update a user
  * @apiName UserController
  * @apiGroup updatePublic
  *
  * @apiDescription update the information of a user
  *
  * @apiParam {String} email  email
  * @apiParam {String} firstName  firstName
  * @apiParam {String} lastName  lastName
  * @apiParam {String} bio  bio
  * @apiParam {String} url  url
  *
  * @apiSuccess {String} tokenJWT User information
  * @apiSuccess {String} message success message
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
  * @api {Post} /user/update/privatePassword/:id  update a user
  * @apiName UserController
  * @apiGroup updatePrivatePassword
  *
  * @apiDescription update the information private of a user
  *
  * @apiParam {String} password  password
  * @apiParam {String} newPassword  newPassword

  *
  * @apiSuccess {String} tokenJWT User information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 401 email is invalid) {String} message Return if this email is already use
  * @apiError (Bad Request 403 password is invalid) {String} message Return if the password is wrong password
  * @apiError (Bad Request 404 password is invalid) {String} message Return if we did not find any User
  */
  {
    method: 'POST',
    path: '/user/update/private/:id',
    handler: UserController.updatePrivate,
    validator: [isLogin],
  },

  /**
  * @api {Post} /user/verifyEmail verified a email of a user
  * @apiName UserController
  * @apiGroup verifyEmail
  *
  * @apiDescription verifie a email of a user
  *
  * @apiParam {String} email  email
  * @apiParam {String} token  token

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

  {
    method: 'GET',
    path: '/user/resetPassword/:email',
    handler: UserController.resetPassword,
    validator: [],
  },

  {
    method: 'PUT',
    path: '/user/resetPassword/:email/:code/:newPassword',
    handler: UserController.resetVerefiPassword,
    validator: [],
  },

  {
    method: 'POST',
    path: '/user/create/facebook',
    handler: UserController.facebookCreate,
    validator: [],
  },

  {
    method: 'POST',
    path: '/user/link/facebook/:id',
    handler: UserController.facebookLink,
    validator: [],
  },
]
