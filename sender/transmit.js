'use strict'

const request = require('request')
const Kefir = require('kefir')

const events = Kefir.pool()

const transmit = (message, encoding, callback) => {
  events.plug(Kefir.constant(message))
  callback() // TODO: do something with errors
}

const post = (message) => {
  request.post('http://localhost:8080/event', {
    json: true,
    body: message
  })
}

// This is a hack, because we aren't being told when to stop listening.
// In reality, that would be an interface requirement.
const finished = Kefir.merge([
	Kefir.later(3000), // in case transmit is never called
	events
]).debounce(2000) // no events for 2 seconds triggers the end

events
  .takeUntilBy(finished)
  .bufferWithTimeOrCount(1500)           // Flush every 1.5 seconds
  .filter((buffer) => buffer.length > 0) // Don't send empty messages
  .onValue(post)

module.exports = transmit
