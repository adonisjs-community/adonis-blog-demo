'use strict'

const Factory = use('Factory')
const User = use('App/Models/User')
const { test, trait } = use('Test/Suite')('Register')

trait('Test/Browser')
trait('DatabaseTransactions')

test('we can register a new user', async ({ assert, browser }) => {
  // Given we are on the register  page
  const page = await browser.visit('/register')

  // When we fill and send the login form
  await page
    .type('[name="username"]', 'romain.lanz')
    .type('[name="email"]', 'romain.lanz@slynova.ch')
    .type('[name="password"]', 'secret')
    .type('[name="password_confirmation"]', 'secret')
    .submitForm('form')
    .waitForNavigation()

  // We expect to be on the homepage
  await page.assertPath('/')

  // And to have a user into the database
  const user = await User.findBy('username', 'romain.lanz')
  assert.isNotNull(user)
}).timeout(0)

test('we need to provide a valid email', async ({ assert, browser }) => {
  // Given we are on the register  page
  const page = await browser.visit('/register')

  // When we fill and send the login form
  await page
    .type('[name="username"]', 'romain.lanz')
    .type('[name="email"]', 'romain.lanz')
    .type('[name="password"]', 'secret')
    .type('[name="password_confirmation"]', 'secret')
    .submitForm('form')
    .waitForNavigation()

  // We expect to be again on the register page
  await page.assertPath('/register')

  // And to see the username filled
  await page.assertValue('[name="username"]', 'romain.lanz')

  // And to see the email filled
  await page.assertValue('[name="email"]', 'romain.lanz')

  // And we expect to see a form error
  await page.assertExists('small.text-xs')
})

test('we need to provide a identical password', async ({ assert, browser }) => {
  // Given we are on the register  page
  const page = await browser.visit('/register')

  // When we fill and send the login form
  await page
    .type('[name="username"]', 'romain.lanz')
    .type('[name="email"]', 'romain.lanz@slynova.ch')
    .type('[name="password"]', 'secret')
    .type('[name="password_confirmation"]', 'secret2')
    .submitForm('form')
    .waitForNavigation()

  // We expect to be again on the register page
  await page.assertPath('/register')

  // And to see the username filled
  await page.assertValue('[name="username"]', 'romain.lanz')

  // And to see the email filled
  await page.assertValue('[name="email"]', 'romain.lanz@slynova.ch')

  // And we expect to see a form error
  await page.assertExists('small.text-xs')
})

test('we cannot have two same username', async ({ assert, browser }) => {
  // Given we have a user
  const user = await Factory.model('App/Models/User').create()

  // And we are on the register  page
  const page = await browser.visit('/register')

  // When we fill and send the login form
  await page
    .type('[name="username"]', user.username)
    .type('[name="email"]', user.email)
    .type('[name="password"]', 'secret')
    .type('[name="password_confirmation"]', 'secret')
    .submitForm('form')
    .waitForNavigation()

  // We expect to be again on the register page
  await page.assertPath('/register')

  // And to see the username filled
  await page.assertValue('[name="username"]', user.username)

  // And to see the email filled
  await page.assertValue('[name="email"]', user.email)

  // And we expect to see a form error
  await page.assertExists('small.text-xs')
})
