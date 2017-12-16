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

// This is a hack, because we aren't being told when to terminate.
// In reality, that would be an interface requirement.
const finished = events.debounce(2000)

events
  .bufferWithTimeOrCount(1500)           // Flush every 1.5 seconds
  .filter((buffer) => buffer.length > 0) // Don't send empty messages
  .takeUntilBy(finished)
  .onValue(post)

module.exports = transmit
