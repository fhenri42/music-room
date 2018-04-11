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
  * @apiSuccess {Object} Playlist information
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
  * @api {Get} /room/all/:userId get a room
  * @apiName RoomController
  * @apiGroup getPlaylistByName
  *
  * @apiDescription get all the room
  *
  * @apiParam {String} userId  userId
  *
  * @apiSuccess {Object} Playlist information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 403 userId is invalid) {String} message Return if user are not allowed to access this room
  *
  */

  {
    method: 'GET',
    path: '/room/all',
    handler: RoomController.getRoomAll,
    validator: [isLogin],
  },

  /**
  * @api {Get} /room/:name/:userId get a room
  * @apiName RoomController
  * @apiGroup getPlaylistByName
  *
  * @apiDescription get a room by name
  *
  * @apiParam {String} name  name
  * @apiParam {String} userId  userId
  *
  * @apiSuccess {Object} Playlist information
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
  * @api {Post} /room/update/:name/:userId  update a user
  * @apiName RoomController
  * @apiGroup updatePublic
  *
  * @apiDescription update the information of a room
  *
  * @apiParam {String} description  description
  * @apiParam {String} type  type
  * @apiParam {String} users  users
  * @apiParam {String} songs  songs
  *
  * @apiSuccess {Object} Playlist information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 403 userId is invalid) {String} message Return if user are not allowed to access this room
  *
  */

  {
    method: 'POST',
    path: '/room/update/:roomId/:userId',
    handler: RoomController.updatePublic,
    validator: [isLogin],
  },

  /**
nIqUE LA DocC
**/
  {
    method: 'POST',
    path: '/room/updatePrivate/:roomId/:userId',
    handler: RoomController.updatePrivate,
    validator: [isLogin],
  },
  {
    method: 'PUT',
    path: '/room/update/:roomId/:userId/:newId/:songName',
    handler: RoomController.addMusicToList,
    validator: [isLogin],
  },

  {
    method: 'PUT',
    path: '/room/delete/user/:roomId/:userId/:userIdToDelete',
    handler: RoomController.deleteUser,
    validator: [isLogin],
  },
]
