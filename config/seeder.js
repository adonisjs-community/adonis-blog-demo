'use strict';

const Env = use('Env');
const Helpers = use('Helpers');

module.exports = {
    /*
    |--------------------------------------------------------------------------
    | Default Connection
    |--------------------------------------------------------------------------
    |
    | Connection defines the default connection settings to be used while
    | interacting with SQL databases.
    |
    */
    'permissions_map': {
        c: {'name': 'create'},
        s: {"name": 'store'},
        r: {'name': 'read'},
        e: {"name": "edit"},
        u: {'name': 'update'},
        d: {'name': 'delete'},
        l: {"name": "list"}

    },
    'role_structure': {
        'superadministrator': [
            {'users': 'c,r,u,d'},
            {'acl': 'c,r,u,d'},
            {'profile': 'r,u'}
        ]
    }

}
