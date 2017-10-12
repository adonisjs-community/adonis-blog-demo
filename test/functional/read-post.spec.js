'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Read Post')

trait('Auth/Client')
trait('Session/Client')
trait('Test/ApiClient')
trait('DatabaseTransactions')

test("should see an information when there's no post", async ({ assert, client }) => {
  // Given we have no post

  // When we fetch the home page
  const response = await client.get('/').end()

  // The request should be good
  response.assertStatus(200)

  // And we expect to see the message "There's no post available!"
  assert.include(response.text, "There's no post available!")
})

test('should see post on home page', async ({ assert, client }) => {
  // Given we already have a post
  const post = await Factory.model('App/Models/Post').create()

  // When we fetch the home page
  const response = await client.get('/').end()

  // The request should be good
  response.assertStatus(200)

  // And we expect to see the title of the created post
  assert.include(response.text, post.title)
})
