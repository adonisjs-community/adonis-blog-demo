'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Read Post')

trait('Auth/Client')
trait('Test/Browser')
trait('Test/ApiClient')
trait('DatabaseTransactions')

test("should see an information when there's no post", async ({ assert, browser }) => {
  // Given we have no post

  // When we fetch the home page
  const page = await browser.visit('/')

  // The request should be good
  page.assertStatus(200)

  // And we expect to see the message "There's no post available!"
  page.assertHas('There\'s no post available')
})

test('should see post on home page', async ({ assert, browser }) => {
  // Given we already have a post
  const post = await Factory.model('App/Models/Post').create()

  // When we fetch the home page
  const page = await browser.visit('/')

  // The request should be good
  page.assertStatus(200)

  // And we expect to see the title of the created post
  page.assertHas(post.title)
})
