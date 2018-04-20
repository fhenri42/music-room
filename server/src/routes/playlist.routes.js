import PlaylistController from '../controllers/playlist.controller'
import { isLogin } from './validators'

export default [

  /**
  * @api {Post} /playlist/create Create a new playList
  * @apiName PlaylistController
  * @apiGroup Create
  *
  * @apiDescription Create a new playList
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
    path: '/playlist/create',
    handler: PlaylistController.create,
    validator: [isLogin],
  },

  /**
  * @api {Get} /playlist/all/:userId Get a playList
  * @apiName PlaylistController
  * @apiGroup getPlaylistAll
  *
  * @apiDescription Get all the playList
  *
  * @apiParam {String} userId  userId
  *
  * @apiSuccess {Object} Playlist information
  * @apiSuccess {String} message success message
  *
  *
  */

  {
    method: 'GET',
    path: '/playlist/all/:userId',
    handler: PlaylistController.getPlaylistAll,
    validator: [isLogin],
  },

  /**
  * @api {Get} /playlist/:name/:userId Get a playList
  * @apiName PlaylistController
  * @apiGroup getPlaylistByName
  *
  * @apiDescription Get a playList by name
  *
  * @apiParam {String} name  name
  * @apiParam {String} userId  userId
  *
  * @apiSuccess {Object} Playlist information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 403 userId is invalid) {String} message Return if user are not allowed to access this playList
  *
  */

  {
    method: 'GET',
    path: '/playlist/:name/:userId',
    handler: PlaylistController.getPlaylistByName,
    validator: [isLogin],
  },

  /**
  * @api {Post} /playlist/update/:name/:userId  Update a user
  * @apiName PlaylistController
  * @apiGroup updatePublic
  *
  * @apiDescription Update the information of a playlist
  *
  * @apiParam {String} description  description
  * @apiParam {Number} type  type
  * @apiParam {Array} users  users
  * @apiParam {Array} songs  songs
  *
  * @apiSuccess {Object} Playlist information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 403 userId is invalid) {String} message Return if user are not allowed to access this playList
  * @apiError (Bad Request 404 userId is invalid) {String} message Return if No playList are found
  *
  */

  {
    method: 'POST',
    path: '/playlist/update/:playListId/:userId',
    handler: PlaylistController.updatePublic,
    validator: [isLogin],
  },

  /**
  * @api {Post} /playlist/updatePrivate/:playListId/:userId  Update a private user
  * @apiName PlaylistController
  * @apiGroup updatePrivate
  *
  * @apiDescription Update the information of a private playlist
  *
  * @apiParam {Number} type  type
  * @apiParam {String} email  email
  *
  * @apiSuccess {Object} Playlist information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 403 userId is invalid) {String} message Return if user are not allowed to access this playList
  * @apiError (Bad Request 404 userId is invalid) {String} message Return if no playlist fount
  *
  */

  {
    method: 'POST',
    path: '/playlist/updatePrivate/:playListId/:userId',
    handler: PlaylistController.updatePrivate,
    validator: [isLogin],
  },

  /**
  * @api {Put} /playlist/update/:playListId/:userId/:newId/:songName  Add music to list
  * @apiName PlaylistController
  * @apiGroup addMusicToList
  *
  * @apiDescription Add music to list
  *
  * @apiParam {ObjectId} playListId  playListId
  * @apiParam {ObjectId} userId  userId
  * @apiParam {ObjectId} newId  newId
  * @apiParam {String} songName  songName
  *
  * @apiSuccess {Object} Playlist information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 403 userId is invalid) {String} message Return if user are not allowed to access this playList
  * @apiError (Bad Request 404 userId is invalid) {String} message Return if no playlist fount
  *
  */

  {
    method: 'PUT',
    path: '/playlist/update/:playListId/:userId/:newId/:songName',
    handler: PlaylistController.addMusicToList,
    validator: [isLogin],
  },

  /**
  * @api {Put} /playlist/delete/user/:playListId/:userId/:userIdToDelete Delete a user
  * @apiName PlaylistController
  * @apiGroup deleteUser
  *
  * @apiDescription Delete a user
  *
  * @apiParam {ObjectId} playListId  playListId
  * @apiParam {ObjectId} userIdToDelete  userIdToDelete
  *
  * @apiSuccess {Object} Playlist information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 404 userId is invalid) {String} message Return if no playlist fount
  *
  */

  {
    method: 'PUT',
    path: '/playlist/delete/user/:playListId/:userId/:userIdToDelete',
    handler: PlaylistController.deleteUser,
    validator: [isLogin],
  },

  /**
  * @api {Post} /playlist/import/list/:userId Import a playlist
  * @apiName PlaylistController
  * @apiGroup importPlayList
  *
  * @apiDescription Import a playlist
  *
  * @apiParam {ObjectId} userId  userId
  *
  * @apiSuccess {String} Playlist information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 404 userId is invalid) {String} message Return if user not found
  *
  */

  {
    method: 'POST',
    path: '/playlist/import/list/:userId',
    handler: PlaylistController.importPlayList,
    validator: [isLogin],
  },
]
