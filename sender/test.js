'use strict'

const transmit = require('./transmit.js')
const expect = require('expect')
const Kefir = require('kefir')

// Use Kefir to create mock scenarios

const message = {key: "value"}

// event stream with long pause in the middle
const longDelay = Kefir.concat([
  Kefir.interval(100,message).take(10),
  Kefir.later(3000,message),
  Kefir.interval(100,message).take(10)
])

// copy the behaviour of transmit.js
const runWith = (events) => {
  const finished = events.debounce(2000)
  return events
    .bufferWithTimeOrCount(1500)           // Flush every 1.5 seconds
    .filter((buffer) => buffer.length > 0) // Don't send empty messages
    .takeUntilBy(finished)
}

// define a single test as a stream
const testDelay = runWith(longDelay)
  .bufferWhile() // capture all the output into a single array
  .flatten()
  .onValue(array => expect(array.length).toBe(10))

// combine all the tests into a single test
Kefir.merge([ testDelay ])
  .onEnd(() => console.log("all tests passed"))

