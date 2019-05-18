'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {

      const role = await Factory.model('Adonis/Acl/Role').create({"slug": "admin", "name": "Administrator"})

      const user = await Factory.model('App/Models/User').create({
          username: 'admin',
          email: 'admin@test.com',
          password: 'secret',
      });
      await user.roles().attach([role.id])

  }
}

module.exports = UserSeeder
