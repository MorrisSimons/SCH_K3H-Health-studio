// Test if the server is up

const { query } = require('express')

function testAddUser () {
  // Create a new user
  const user = {
    email: 'test@test.test'
  }
  // Send the user to the server
  query = fetch('/api/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then((response) => {
    console.log(response)
  })
}
