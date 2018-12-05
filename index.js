const eventSource = new EventSource('http://localhost:9000')
const $ = document.querySelector.bind(document)
const π = document.createElement.bind(document)

eventSource.addEventListener('runner-state', function (e) {
  const state = JSON.parse(e.data)
  $('runner-state').textContent = state
  if (state === 'finished') eventSource.close()
})

eventSource.addEventListener('test-start', function (e) {
  const test = JSON.parse(e.data)
  const testResult = π('test-result')
  testResult.id = `test${test.id}`
  testResult.innerHTML = `<span>${test.name}</span>
    <span>${test.state}</span>
    <span></span>`
  $('test-results').appendChild(testResult)
})

eventSource.addEventListener('test-end', function (e) {
  const test = JSON.parse(e.data)
  const testResult = $(`#test${test.id}`)
  testResult.children[1].textContent = test.state
  testResult.children[2].textContent = test.duration
})
