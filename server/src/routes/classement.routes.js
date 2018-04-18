import ClassementController from '../controllers/classement.controller'
import { isLogin } from './validators'

export default [
  /**
  * @api {Post} /classement/create Create a new classement
  * @apiName ClassementController
  * @apiGroup Create
  *
  * @apiDescription Create a new classement
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
    path: '/classement/create',
    handler: ClassementController.create,
    validator: [isLogin],
  },

  /**
  * @api {Get} /classement/all get a classement
  * @apiName ClassementController
  * @apiGroup getPlaylistByName
  *
  * @apiDescription get all the classement
  *
  * @apiParam {String} userId  userId
  *
  * @apiSuccess {Object} Playlist information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 403 userId is invalid) {String} message Return if user are not allowed to access this classement
  *
  */

  {
    method: 'GET',
    path: '/classement/all',
    handler: ClassementController.getAll,
    validator: [isLogin],
  },

  /**
  * @api {Post} /classement/update update a classmeent
  * @apiName ClassementController
  * @apiGroup updatePublic
  *
  * @apiDescription update the information of a classement
  *
  * @apiParam {String} songs  songs
  *
  * @apiSuccess {Object} Playlist information
  * @apiSuccess {String} message success message
  *
  * @apiError (Bad Request 403 userId is invalid) {String} message Return if user are not allowed to access this classement
  *
  */

  {
    method: 'POST',
    path: '/classement/update',
    handler: ClassementController.update,
    validator: [isLogin],
  }
]

