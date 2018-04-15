'use strict'

/*
|--------------------------------------------------------------------------
| Websocket Config
|--------------------------------------------------------------------------
|
| Used by AdonisJs websocket server
|
*/
module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Path
  |--------------------------------------------------------------------------
  |
  | The base path on which the websocket server will accept connections.
  |
  */
  path: '/adonis-ws',

  /*
  |--------------------------------------------------------------------------
  | Server Interval
  |--------------------------------------------------------------------------
  |
  | This interval is used to create a timer for identifying dead client
  | connections.
  |
  */
  serverInterval: 30000,

  /*
  |--------------------------------------------------------------------------
  | Server Attempts
  |--------------------------------------------------------------------------
  |
  | Server attempts are used with serverInterval to identify dead client
  | connections. A total of `serverAttempts` attmepts after `serverInterval`
  | will be made before terminating the client connection.
  |
  */
  serverAttempts: 3,

  /*
  |--------------------------------------------------------------------------
  | Client Interval
  |--------------------------------------------------------------------------
  |
  | This interval is used by client to send ping frames to the server.
  |
  */
  clientInterval: 25000,

  /*
  |--------------------------------------------------------------------------
  | Client Attempts
  |--------------------------------------------------------------------------
  |
  | Clients attempts are number of times the client will attempt to send the
  | ping, without receiving a pong from the server. After attempts have
  | been elapsed, the client will consider server as dead.
  |
  */
  clientAttempts: 3
}
