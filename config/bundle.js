'use strict'

const Helpers = use('Helpers')

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Autodiscover
  |--------------------------------------------------------------------------
  |
  | Defines if the bundler need to discover your assets
  | inside specified folder defined bellow.
  |
  */
  autodiscover: true,

  /*
  |--------------------------------------------------------------------------
  | OutDir
  |--------------------------------------------------------------------------
  |
  | Defines where the bundler need to dump bundled assets.
  |
  */
  outDir: Helpers.publicPath(),

  /*
  |--------------------------------------------------------------------------
  | Discovery settings
  |--------------------------------------------------------------------------
  |
  | Defines the pattern to use for auto-discovering assets.
  |
  */
  discover: {
    path: Helpers.resourcesPath('assets'),
    pattern: '*/app.*'
  },

  /*
  |--------------------------------------------------------------------------
  | Custom bundles
  |--------------------------------------------------------------------------
  |
  | Defines custom bundle that doesn't go insto the auto-discovering
  | pattern.
  |
  */
  customBundles: [
    // Helpers.resourcesPath('assets/less/main.less'),
  ],

}

