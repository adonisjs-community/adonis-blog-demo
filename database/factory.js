'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, index, data) => {
  const defaultValue = {
    username: faker.username(),
    email: faker.email(),
    password: 'secret',
  }

  return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Post', (faker) => {
  return {
    title: faker.sentence(),
    body: faker.paragraph(),
    user_id: async () => {
      return (await Factory.model('App/Models/User').create()).id
    }
  }
})
