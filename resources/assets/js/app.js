import jQuery from 'jquery'
import Popper from 'popper.js'
import 'bootstrap'
import Ws from '@adonisjs/websocket-client'

window.$ = window.jQuery = jQuery
window.Popper = Popper

const ws = Ws('ws://localhost:3333')
