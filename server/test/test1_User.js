import chai from "chai"
import request from 'superagent'
//import server from '../src/index.js'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'


// let token = ''
// global.tokenAdmin = ''
// global.tokenUser = ''
const serverUrl = 'http://localhost:8080'
var user = { firstName: 'un', password: 'fwefewfewfewfewfewfewfew', lastName: 'TonPere', email: 'oeijgoiewjg@feoigheiowj.com', id: 0 }
var token = ""

chai.should()
const assert = require('chai').assert
describe('Test of UserController', () => {
	var endpoint = 'user/create'
	it('Create user', (done) => {
		request.post(`${serverUrl}/${endpoint}`)
			.send(user)
			.set('Accept', 'application/json')
			.then((res) => {
				console.log('\n\nuser', user, '\n\n\n')
				user = jwt.decode(res.body.token)
				console.log(user)
				token = res.body.token
				assert.equal(res.statusCode, '200')
				done()
			})
	})
	it('WhoAmI', (done) => {

		endpoint = `user/${user.email}`
		request.get(`${serverUrl}/${endpoint}`)
			.set('Accept', 'application/json')
			.set('x-pass', 'fwefewfewfewfewfewfewfew')
			.then((res) => {
				assert.equal(res.statusCode, '200')
				done()
			})
	})
	it('Update Public User', (done) => {

		endpoint = `/user/update/${user.id}`
		user.lastName = 'okok'
		request.post(`${serverUrl}/${endpoint}`)
			.send(user)
			.set('Accept', 'application/json')
			.set('X-Access-Token', token || '')
			.then((res) => {
				assert.equal(res.statusCode, '200')
				done()
			})
	})
	it('Update Public User', (done) => {

		endpoint = `/user/update/private/${user.id}`
		user.lastName = 'koko'
		request.post(`${serverUrl}/${endpoint}`)
			.send(user)
			.set('Accept', 'application/json')
			.set('X-Access-Token', token || '')
			.then((res) => {
				assert.equal(res.statusCode, '200')
				done()
			})
	})
})


