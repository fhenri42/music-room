import express from 'express'
import userRoutes from './user.routes'
import playlistRoute from './playlist.routes'

export const routes = [
  ...userRoutes,
  ...playlistRoute,
]

export const createRouter = app => {
  const router = express.Router()
  routes.forEach(r => {
    router[r.method.toLowerCase()](r.path, async (req, res) => {
      try {
        for (const validator of r.validator) {
          await validator(req, res)
        }
        await r.handler(req, res)
      } catch (err) {
        console.log(err)
      }
    })
  })

  app.use(router)

}
