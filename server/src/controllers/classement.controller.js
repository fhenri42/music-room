import filter from 'filter-object'
import Classement from '../models/classement.model'
import _ from 'lodash'
import request from 'superagent'

const updateParamsPublic = '{songs}'
export default class ClassementController {

  static create (req, res) {
    const classement1 = new Classement({
      songs: [],
    })
    Classement.find().then(classement => {
      if (!classement[0]) {
        classement1.save(err => {
          if (err) { return res.status(500).send({ message: 'internal serveur error' }) }
          return res.json({ message: 'Your classement', classement })
        }).catch(e => {
          console.log('e =>', e)
        })
      }
    })
  }

  static getAll (req, res) {
    Classement.find().then(classement => {
      return res.json({ message: 'Your rooms', classement: classement[0] }) /* istanbul ignore next */
    }).catch(() => { return res.status(500).send({ message: 'Internal serveur error' }) })
  }

  static update (req, res) {
    Classement.find().then(classements => {
      if (!classements) { return res.status(404).send({ message: 'No classement found' }) }
      Classement.findOneAndUpdate({ _id: classements[0]._id }, { songs: req.body.songs }, { new: true }).then(classement => {
        classement.songs = _.sortBy(classement.songs, ['vote'], ['desc'])
        return res.json({ message: 'Your classement', classement })
      }).catch(() => {
        return res.status(500).send({ message: 'Internal serveur error' })
      })
    })
  }
}
