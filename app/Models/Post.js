'use strict'

const Model = use('Model')

class Post extends Model {
  author () {
    return this.belongsTo('App/Models/User', 'user_id')
  }
}

module.exports = Post
