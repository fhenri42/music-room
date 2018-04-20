import express from 'express'
import userRoutes from './user.routes'
import playlistRoute from './playlist.routes'
import roomRoute from './room.routes'
import classementRoute from './classement.routes'

export const routes = [
  ...userRoutes,
  ...playlistRoute,
  ...roomRoute,
  ...classementRoute,
]

export const createRouter = app => {
  const router = express.Router()
  routes.forEach(r => {
    router[r.method.toLowerCase()](r.path, async (req, res) => {
      for (const validator of r.validator) {
        await validator(req, res)
      }
      await r.handler(req, res)

    })
  })

  app.use(router)

}
