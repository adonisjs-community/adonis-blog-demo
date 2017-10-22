'use strict'

const Factory = use('Factory')
const Post = use('App/Models/Post')
const { test, trait } = use('Test/Suite')('Delete Post')

trait('Auth/Client')
trait('Test/Browser')
trait('Session/Client')
trait('DatabaseTransactions')

test('we can delete a post', async ({ assert, browser }) => {
  // Given we have a post
  const post = await Factory.model('App/Models/Post').create()

  // And we have a user
  const user = await Factory.model('App/Models/User').create()

  // And we are logged on the homepage
  const page = await browser.visit(`/`, (request) => {
    request.loginVia(user)
  })

  // When we click on the trash icon
  await page
    .click('.trash')
    .waitForNavigation()

  // We expect to be again on the homepage
  await page.assertPath('/')

  // And we expect that no post exists on the database
  try {
    await Post.findOrFail(post.id)
    assert.isTrue(false)
  } catch (e) {}
})
