'use strict'

const Post = use('App/Models/Post')
const { validateAll } = use('Validator')

class PostController {
  async index ({ view }) {
    /**
     * Fetch all posts inside our database.
     *
     * ref: http://adonisjs.com/docs/4.1/lucid#_all
     */
    const posts = await Post.all()

    /**
     * Render the view 'posts.index'
     * with the posts fetched as data.
     *
     * ref: http://adonisjs.com/docs/4.1/views
     */
    return view.render('posts.index', { posts: posts.toJSON() })
  }

  create ({ view }) {
    /**
     * Render the view 'posts.create'.
     *
     * ref: http://adonisjs.com/docs/4.1/views
     */
    return view.render('posts.create')
  }

  async store ({ auth, session, request, response }) {
    /**
     * Getting needed parameters.
     *
     * ref: http://adonisjs.com/docs/4.1/request#_only
     */
    const data = request.only(['title', 'body'])

    /**
     * Validating our data.
     *
     * ref: http://adonisjs.com/docs/4.1/validator
     */
    const validation = await validateAll(data, {
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
     * Creating a new post through the logged in user
     * into the database.
     *
     * ref: http://adonisjs.com/docs/4.1/lucid#_create
     */
    const currentUser = await auth.getUser()
    await currentUser.posts().create(data)

    return response.redirect('/')
  }

  async edit ({ params, view }) {
    /**
     * Finding the post.
     *
     * ref: http://adonisjs.com/docs/4.1/lucid#_findorfail
     */
    const post = await Post.findOrFail(params.id)

    return view.render('posts.edit', { post: post.toJSON() })
  }

  async update ({ params, session, request, response }) {
    /**
     * Getting needed parameters.
     *
     * ref: http://adonisjs.com/docs/4.1/request#_only
     */
    const data = request.only(['title', 'body'])

    /**
     * Validating our data.
     *
     * ref: http://adonisjs.com/docs/4.1/validator
     */
    const validation = await validateAll(data, {
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
     * ref: http://adonisjs.com/docs/4.1/lucid#_inserts_updates
     */
    const post = await Post.findOrFail(params.id)
    post.merge(data)
    await post.save()

    return response.redirect('/')
  }

  async delete ({ params, response }) {
    /**
     * Finding the post and deleting it
     *
     * ref: http://adonisjs.com/docs/4.1/lucid#_deletes
     */
    const post = await Post.findOrFail(params.id)
    await post.delete()

    return response.redirect('/')
  }
}

module.exports = PostController
