'use strict'

/*
*  Modify this file as needed.
*/

const http = require('http')

process.on('SIGTERM', function() {
  process.exit(0)
})

const server = http.createServer(function(req, res) {
  let body = []
  req.on('data', (buffer) => body.push(buffer))
  req.on('end', () => {
    // just print to stdout
    printArray(
      JSON.parse(
        Buffer.concat(body).toString()
      )
    )
    res.end()
  })
})

const printArray = (array) => array.forEach(
  value => console.log(JSON.stringify(value))
)

server.listen(8080)
