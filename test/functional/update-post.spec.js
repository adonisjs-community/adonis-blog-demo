'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Update Post')

trait('Auth/Client')
trait('Test/Browser')
trait('Session/Client')
trait('DatabaseTransactions')

test('fields are filled when editing a post', async ({ browser }) => {
  // Given we have a post
  const post = await Factory.model('App/Models/Post').create()

  // And we have a user
  const user = await Factory.model('App/Models/User').create()

  // And we are logged on the post update form page
  const page = await browser.visit(`/posts/${post.id}/edit`, (request) => {
    request.loginVia(user)
  })

  // We expect to see the title filled
  await page.assertValue('[name="title"]', post.title)

  // And to see the body filled
  await page.assertValue('[name="body"]', post.body)
})

test('we can update a post', async ({ browser, assert }) => {
  // Given we have a post
  const post = await Factory.model('App/Models/Post').create()

  // And we have a user
  const user = await Factory.model('App/Models/User').create()

  // And we are logged on the post update form page
  const page = await browser.visit(`/posts/${post.id}/edit`, (request) => {
    request.loginVia(user)
  })

  // When we fill and send the form
  await page
    .clear('[name="title"]')
    .clear('[name="body"]')
    .type('[name="title"]', 'Post Edited')
    .type('[name="body"]', 'New Body')
    .submitForm('form')
    .waitForNavigation()

  // We expect to be again on the homepage
  await page
    .assertPath('/')

  // and to see the title of our post
  await page.assertHas('Post Edited')

  // and to not see the title of our old post
  assert.notInclude(await page.getText(), post.title)
}).timeout(0)
