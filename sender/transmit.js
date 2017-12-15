'use strict'

const request = require('request')
const Kefir = require('kefir')

const events = Kefir.pool()
const callbacks = Kefir.pool()

const transmit = (message, encoding, callback) => {
	callbacks.plug(Kefir.constant(callback)) // TODO: callback with errors
	events.plug(Kefir.constant(message))
}

const post = (message,cb) => {
	request.post('http://localhost:8080/event',
		{json: true, body: message},
		(err, res, body) => cb(err)
	)
}

const callback = callbacks.toProperty(() => console.error)
Kefir.combine([events],[callback])
	.log()
	.onValue(([m,f]) => post(m,f))

module.exports = transmit
