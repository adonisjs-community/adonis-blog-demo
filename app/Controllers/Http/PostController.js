'use strict'

const Post = use('App/Models/Post')
const { validate } = use('Validator')

class PostController {
  async index ({ view }) {
    /**
     * Fetch all posts inside our database.
     *
     * ref: http://dev.adonisjs.com/docs/4.0/lucid#_all
     */
    const posts = await Post.all()

    /**
     * Render the view 'posts.index'
     * with the posts fetched as data.
     *
     * ref: http://dev.adonisjs.com/docs/4.0/views
     */
    return view.render('posts.index', { posts: posts.toJSON() })
  }

  create ({ view }) {
    /**
     * Render the view 'posts.create'.
     *
     * ref: http://dev.adonisjs.com/docs/4.0/views
     */
    return view.render('posts.create')
  }

  async store ({ session, request, response }) {
    /**
     * Getting needed parameters.
     *
     * ref: http://dev.adonisjs.com/docs/4.0/request#_only
     */
    const data = request.only(['title', 'body'])

    /**
     * Validating our data.
     *
     * ref: http://dev.adonisjs.com/docs/4.0/validator
     */
    const validation = await validate(data, {
      title: 'required',
      body: 'required',
    })

    /**
     * If validation fails, early returns with validation message.
     */
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    /**
     * Creating a new post into the database.
     *
     * ref: http://dev.adonisjs.com/docs/4.0/lucid#_create
     */
    await Post.create(data)

    return response.redirect('/')
  }

  async edit ({ params, view }) {
    /**
     * Finding the post.
     *
     * ref: http://dev.adonisjs.com/docs/4.0/lucid#_findorfail
     */
    const post = await Post.findOrFail(params.id)

    return view.render('posts.edit', { post: post.toJSON() })
  }

  async update ({ params, session, request, response }) {
    /**
     * Getting needed parameters.
     *
     * ref: http://dev.adonisjs.com/docs/4.0/request#_only
     */
    const data = request.only(['title', 'body'])

    /**
     * Validating our data.
     *
     * ref: http://dev.adonisjs.com/docs/4.0/validator
     */
    const validation = await validate(data, {
      title: 'required',
      body: 'required',
    })

    /**
     * If validation fails, early returns with validation message.
     */
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    /**
     * Finding the post and updating fields on it
     * before saving it to the database.
     *
     * ref: http://dev.adonisjs.com/docs/4.0/lucid#_inserts_updates
     */
    const post = await Post.findOrFail(params.id)
    post.merge(data)
    await post.save()

    return response.redirect('/')
  }

  async delete () {
  }
}

module.exports = PostController
