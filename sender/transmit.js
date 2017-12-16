'use strict'

const request = require('request')
const Kefir = require('kefir')

const events = Kefir.pool()

const transmit = (message, encoding, callback) => {
	events.plug(Kefir.constant(message))
	callback() // TODO: callback with errors
}

const post = (message) => {
	request.post('http://localhost:8080/event', {
		json: true,
		body: message
	})
}

events.log().onValue(post)

module.exports = transmit
