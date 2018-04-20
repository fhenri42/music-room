import RoomController from '../controllers/room.controller'
import { isLogin } from './validators'

export default [

  /**
  * @api {Post} /room/create Create a new room
  * @apiName RoomController
  * @apiGroup Create
  *
  * @apiDescription Create a new room
  *
  * @apiParam {String} name  name
  * @apiParam {String} description  description
  * @apiParam {Number} type  type
  * @apiParam {Array} users  users
  * @apiParam {Array} songs  songs
  *
  * @apiSuccess {Object} Room information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 400 email is invalid) {String} message Return if name is already in use
  *
  */

  {
    method: 'POST',
    path: '/room/create',
    handler: RoomController.create,
    validator: [isLogin],
  },

  /**
  * @api {Get} /room/all/:userId Get a room
  * @apiName RoomController
  * @apiGroup getRoomAll
  *
  * @apiDescription Get all the room
  *
  * @apiParam {ObjectId} userId  userId
  * @apiParam {Number} long  long
  * @apiParam {Number} lat  lat
  *
  * @apiSuccess {Object} Room information
  * @apiSuccess {String} message success message
  *
  *
  */

  {
    method: 'GET',
    path: '/room/all/:userId/:lat/:long',
    handler: RoomController.getRoomAll,
    validator: [isLogin],
  },

  /**
  * @api {Get} /room/:name/:userId Get a room
  * @apiName RoomController
  * @apiGroup getRoomByName
  *
  * @apiDescription Get a room by name
  *
  * @apiParam {String} name  name
  * @apiParam {ObjectId} userId  userId
  *
  * @apiSuccess {Object} Room information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 403 userId is invalid) {String} message Return if user are not allowed to access this room
  *
  */

  {
    method: 'GET',
    path: '/room/:name',
    handler: RoomController.getRoomByName,
    validator: [isLogin],
  },

  /**
  * @api {Post} /room/update/:name/:userId  Update a public user
  * @apiName RoomController
  * @apiGroup UpdatePublic
  *
  * @apiDescription update the information of a room
  *
  * @apiParam {ObjectId} roomId  roomId
  *
  * @apiSuccess {Object} Room information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 404 userId is invalid) {String} message Return if No room found
  *
  */

  {
    method: 'POST',
    path: '/room/update/:roomId/:userId',
    handler: RoomController.updatePublic,
    validator: [isLogin],
  },

  /**
  * @api {Post} /room/update/:roomId/:userId/:newId/:songName  Update a private user
  * @apiName RoomController
  * @apiGroup updatePrivate
  *
  * @apiDescription Update the public information of a room
  *
  * @apiParam {ObjectId} roomId  roomId
  * @apiParam {String} email  email
  * @apiParam {ObjectId} userId  userId
  * @apiParam {Number} type  type
  *
  * @apiSuccess {Object} Room information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 404 userId is invalid) {String} message Return if No room found
  * @apiError (Bad Request 403 userId is invalid) {String} message Return if You are not allowed to access this room
  *
  */

  {
    method: 'POST',
    path: '/room/update/:roomId/:userId/:newId/:songName',
    handler: RoomController.updatePrivate,
    validator: [isLogin],
  },

  /**
  * @api {Put} /room/update/:roomId/:userId/:newId/:songName Add music to list
  * @apiName RoomController
  * @apiGroup addMusicToList
  *
  * @apiDescription Add music to list
  *
  * @apiParam {ObjectId} roomId  roomId
  * @apiParam {ObjectId} newId  newId
  * @apiParam {String} songName  songName
  *
  * @apiSuccess {Object} Room information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 404 userId is invalid) {String} message Return if No room found
  *
  */

  {
    method: 'PUT',
    path: '/room/update/:roomId/:userId/:newId/:songName',
    handler: RoomController.addMusicToList,
    validator: [isLogin],
  },

  /**
  * @api {Put} /room/delete/user/:roomId/:userId/:userIdToDelete Delete a user
  * @apiName RoomController
  * @apiGroup deleteUser
  *
  * @apiDescription Delete a user
  *
  * @apiParam {ObjectId} roomId  roomId
  * @apiParam {ObjectId} userIdToDelete  userIdToDelete
  *
  * @apiSuccess {Object} Room information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 404 userId is invalid) {String} message Return if No room found
  *
  */

  {
    method: 'PUT',
    path: '/room/delete/user/:roomId/:userId/:userIdToDelete',
    handler: RoomController.deleteUser,
    validator: [isLogin],
  },
]
