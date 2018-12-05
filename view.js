const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text/event-stream',
    'Access-Control-Allow-Origin': '*'
  })
  res.write(`event: runner-state\n`)
  res.write(`data: "in-progress"\n\n`)
  res.write(`event: test-start\n`)
  res.write(`data: ${JSON.stringify({ name: 'one', id: 1, state: 'in-progress' })}\n\n`)
  res.write(`event: test-start\n`)
  res.write(`data: ${JSON.stringify({ name: 'two', id: 2, state: 'in-progress' })}\n\n`)
  res.write(`event: test-start\n`)
  res.write(`data: ${JSON.stringify({ name: 'three', id: 3, state: 'in-progress' })}\n\n`)
  setTimeout(() => {
    res.write(`event: test-end\n`)
    res.write(`data: ${JSON.stringify({ name: 'one', id: 1, state: 'pass', duration: 100 })}\n\n`)
  }, 100)
  setTimeout(() => {
    res.write(`event: test-end\n`)
    res.write(`data: ${JSON.stringify({ name: 'two', id: 2, state: 'pass', duration: 600 })}\n\n`)
  }, 600)
  setTimeout(() => {
    res.write(`event: test-end\n`)
    res.write(`data: ${JSON.stringify({ name: 'three', id: 3, state: 'pass', duration: 1000 })}\n\n`)
    res.write(`event: runner-state\n`)
    res.write(`data: "finished"\n\n`)
    res.end()
  }, 1000)
})
server.listen(9000)
