'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Write Post')

trait('Auth/Client')
trait('Test/Browser')
trait('Session/Client')
trait('DatabaseTransactions')

test('we can write a post', async ({ browser }) => {
  // Given we have a user
  const user = await Factory.model('App/Models/User').create()

  // And a generated post
  const post = await Factory.model('App/Models/Post').make()

  // And we are logged on the post form page
  const page = await browser.visit('/posts/create', (request) => {
    request.loginVia(user)
  })

  // When we fill and send the form
  await page
    .type('[name="title"]', post.title)
    .type('[name="body"]', post.body)
    .submitForm('form')
    .waitForNavigation()

  // We expect to be on the homepage
  await page.assertPath('/')

  // and to see the title of our post
  await page.assertHas(post.title)
})

test('a post should have a title', async ({ browser }) => {
  // Given we have a user
  const user = await Factory.model('App/Models/User').create()

  // And a generated post
  const post = await Factory.model('App/Models/Post').make()

  // And we are logged on the post form page
  const page = await browser.visit('/posts/create', (request) => {
    request.loginVia(user)
  })

  // When we fill and send the form
  await page
    .type('[name="body"]', post.body)
    .submitForm('form')
    .waitForNavigation()

  // We expect to be again on the post form page
  await page.assertPath('/posts/create')

  // And to see the body filled
  await page.assertValue('[name="body"]', post.body)

  // And we expect to see a form error
  await page.assertExists('small.form-text')
})

test('a post should have a body', async ({ browser }) => {
  // Given we have a user
  const user = await Factory.model('App/Models/User').create()

  // And a generated post
  const post = await Factory.model('App/Models/Post').make()

  // And we are logged on the post form page
  const page = await browser.visit('/posts/create', (request) => {
    request.loginVia(user)
  })

  // When we fill and send the form
  await page
    .type('[name="title"]', post.title)
    .submitForm('form')
    .waitForNavigation()

  // We expect to be again on the post form page
  await page.assertPath('/posts/create')

  // And to see the title filled
  await page.assertValue('[name="title"]', post.title)

  // And we expect to see a form error
  await page.assertExists('small.form-text')
})
